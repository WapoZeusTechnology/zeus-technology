import { ZeusAdapter } from "../../ZeusAdapter";
import { delay } from "../../utils";
import EventEmitter from "eventemitter3";

describe("ZeusAdapter.connect()", () => {
  beforeEach(() => {
    window.zeus = new EventEmitter()
    window.zeus.name = "zeus"
  });
  afterEach(() => {
    delete window.zeus;
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("calls onInitialize hook on connect", async () => {
    const onInitialize = jest.fn(() => Promise.resolve());
    const adapter = new ZeusAdapter({
      onInitialize
    });

    await adapter.connect();

    expect(onInitialize).toHaveBeenCalledTimes(1);
    expect(onInitialize).toHaveBeenCalledWith(adapter);
  });

  it("throws error after timeout if Zeus isn't initialized", async () => {
    // Remove zeus so connect fails
    delete window.zeus;

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
   * 4. Now, define Zeus on the window scope.
   * 5. Now verify that the command has been run.
   */
  it("waits for zeus to be initialized when it's not available on connect", async () => {
    // Remove zeus so connect fails
    delete window.zeus;

    let isPending = true;
    const onInitialize = jest.fn(() => Promise.resolve());
    const adapter = new ZeusAdapter({ onInitialize });

    const promise = adapter.connect().finally(() => (isPending = false));
    await delay(200); // delay 200ms or about 4 wait cycles
    expect(onInitialize).not.toHaveBeenCalled();
    expect(isPending).toEqual(true);

    window.zeus = new EventEmitter();
    window.zeus.name = "zeus"

    await promise; // let the promise finish

    expect(onInitialize).toHaveBeenCalled();
    expect(onInitialize).toHaveBeenCalledWith(adapter);
  });
});
