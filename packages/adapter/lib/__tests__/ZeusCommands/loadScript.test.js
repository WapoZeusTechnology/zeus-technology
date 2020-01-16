import { ZeusCommands } from "../../ZeusCommands";
import EventEmitter from "eventemitter3";

const AScriptUrl = "https://npm-test.zeustechnology.io";

describe("ZeusCommands.loadScript()", () => {
  /**
   * Verifies the happy path for loadScript.
   *
   * 1. Listens for CUSTOM_LOAD_SCRIPT event on fakeZeus object.
   * 2. Adds an element to the page with the expected ID.
   * 3. Calls loadScript
   * 4. Verifies load script resolves and CUSTOM_LOAD_SCRIPT was called with correct params
   */
  it("Asks zeus to load script when called", async () => {
    expect(ZeusCommands.hasOwnProperty("loadScript")).toBeTruthy();

    // Let's set up a fake Zeus
    globalThis.zeus = new EventEmitter();
    const customSspCommandHook = jest.fn();
    globalThis.zeus.on("CUSTOM_LOAD_SCRIPT", customSspCommandHook);

    // Add a <div id="foo"> for loadScript to "load"
    const el = document.createElement("div");
    el.setAttribute("id", "some-script-id");
    document.getElementsByTagName("body")[0].appendChild(el);

    await expect(
      ZeusCommands.loadScript(AScriptUrl, "some-script-id")
    ).resolves.toEqual();
    expect(customSspCommandHook).toHaveBeenCalledWith({
      scriptUrl: AScriptUrl,
      scriptId: "some-script-id"
    });

    // Clean up
    document.getElementsByTagName("body")[0].removeChild(el);
  });

  /**
   * Verifies that timeout correctly causes loadScript to reject if the script expecting
   * to load is never found on the dom.
   *
   * 1. Calls loadScript with an id not in the dom
   * 2. Attaches a catch to loadScript that expects an error
   * 3. Checks that setTimeout was called with the correct number of seconds.
   * 4. Uses jest fakeTimers to advance all timers and force the timeout without waiting the full
   *    amount of time.
   */
  it("Times out if the script wasn't loaded in a specified amount of time", async () => {
    expect.assertions(2);
    // Let's set up a fake Zeus
    globalThis.zeus = new EventEmitter();

    jest.useFakeTimers();

    const promise = ZeusCommands.loadScript(AScriptUrl, "some-script-id").catch(
      err => {
        expect(err).toEqual(
          new Error(
            "Timeout waiting for script [some-script-id] to be added to dom."
          )
        );
      }
    );

    // Make sure timeout was called with the correct wait time (10s)
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 10000);

    // fast forward timers so we don't end up waiting the full time.
    jest.runAllTimers();

    // Cleanup
    jest.useRealTimers();

    return promise;
  });
});
