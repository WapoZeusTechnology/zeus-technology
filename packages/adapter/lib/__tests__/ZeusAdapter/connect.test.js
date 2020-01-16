import { ZeusAdapter } from "../../ZeusAdapter";
import { delay } from "../../utils";
import EventEmitter from "eventemitter3";

describe("ZeusAdapter.connect()", () => {
  beforeEach(() => (globalThis.zeus = new EventEmitter()));
  afterEach(() => {
    delete globalThis.zeus;
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("calls onInitialize hook on connect", async () => {
    const onInitialize = jest.fn();
    const adapter = new ZeusAdapter({
      onInitialize
    });

    await adapter.connect();

    expect(onInitialize).toHaveBeenCalledTimes(1);
    expect(onInitialize).toHaveBeenCalledWith(adapter);
  });

  it("throws error after timeout if Zeus isn't initialized", async () => {
    // Remove zeus so connect fails
    delete globalThis.zeus;

    // Use fake timers so we wont have to wait the full 10 seconds to timeout
    jest.useFakeTimers();

    // Inform jest we expect an assertion in a catch block
    expect.assertions(1);

    const adapter = new ZeusAdapter();
    try {
      // We can't just await connect since we need to start the timer to advance it. So we save the
      // promise after calling connect, advance the time, then await.
      const promise = adapter.connect();
      jest.runAllTimers();
      await promise;
    } catch (err) {
      expect(err).toEqual(new Error("Timeout waiting to connect to Zeus."));
    }

    jest.clearAllTimers();
  });

  /**
   * Test plan:
   * 1. Don't define zeus yet
   * 2. Start ZeusAdapter
   * 3. Verify that it has not yet been run.
   * 4. Now, define Zeus on the globalThis scope.
   * 5. Now verify that the command has been run.
   */
  it("waits for zeus to be initialized when it's not available on connect", async () => {
    // Remove zeus so connect fails
    delete globalThis.zeus;

    let isPending = true;
    const onInitialize = jest.fn();
    const adapter = new ZeusAdapter({ onInitialize });

    const promise = adapter.connect().finally(() => (isPending = false));
    await delay(200); // delay 200ms or about 4 wait cycles
    expect(onInitialize).not.toHaveBeenCalled();
    expect(isPending).toEqual(true);

    globalThis.zeus = new EventEmitter();

    await promise; // let the promise finish

    expect(onInitialize).toHaveBeenCalled();
    expect(onInitialize).toHaveBeenCalledWith(adapter);
  });

  /**
   * Test plan:
   * 1. Add a div with ID so loadScript will immediately resolve when checking for script load
   * 2. Don't call connect
   * 3. Verify commands aren't available yet since zeus isn't connected and throws error
   * 4. Connect to zeus
   * 5. Verify we can now run the command
   */
  it("commands are not available on adapter until connected", async () => {
    const adapter = new ZeusAdapter();

    // Add a <div id="foo"> for loadScript to "load"
    const el = document.createElement("div");
    el.setAttribute("id", "foo");
    document.getElementsByTagName("body")[0].appendChild(el);

    // Call before connect and expect an error
    await expect(adapter.loadScript("url", "foo")).rejects.toEqual(
      new Error(
        "Zeus is not connected. Either Zeus did not initialize or you may have forgotten to call `adapter.connect()`"
      )
    );
    await adapter.connect();
    // call after connect and expect resolve!
    await expect(adapter.loadScript("url", "foo")).resolves.toEqual();
  });
});
