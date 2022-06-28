/**
 * We have to do some workarounds testing the runCommand because it's a private function, so we will
 * use the ZeusHooks to indirectly test the runCommand function to ensure the safety checks for
 * running the commands are solid.
 */
import { ZeusAdapter } from "../../ZeusAdapter";
import EventEmitter from "eventemitter3";

describe("ZeusAdapter.#runCommand()", () => {
  let realConsole = console.warn;

  beforeEach(() => {
    console.warn = jest.fn();
  });

  afterEach(() => {
    console.warn = realConsole;
  });

  /**
   * Verifies if the user provides a calback to a hook that does not return a promise, a warning is
   * printed to the console.
   * NOTE: Since we don't have commands to run at this point, we can't verify the the return
   * of #runCommand is returned in a new promise.
   *
   * 1. Create a callback to onInitilize that returns an object.
   * 2. Connect the adapter which will trigger the callback to be run via #runCommand
   * 3. Verify that console.warn was called with the correct warning message
   */
  it("Warns the user if the user callback for a hook does not return a promise", async () => {
    window.zeus = new EventEmitter();
    window.zeus.name = "zeus"
    const onInitializeCallback = jest.fn(() => ({}));
    const adapter = new ZeusAdapter({
      onInitialize: onInitializeCallback
    });

    await adapter.connect();

    expect(onInitializeCallback).toHaveBeenCalledWith(adapter);
    expect(console.warn).toHaveBeenCalledWith(
      "[ZeusAdapter] Hook callback must return a Promise. Instead received [object]. Please verify any callbacks supplied to the ZeusAdapter constructor return a Promise."
    );
  });

  /**
   * Verifies if the user provides a calback to a hook that is not a function a warning is printed.
   * NOTE: Since we don't have commands to run at this point, we can't verify the error is thrown.
   *
   * 1. Create a callback to onInitilize that is just an object.
   * 2. Connect the adapter which will trigger the callback to be run via #runCommand
   * 3. Verify that console.warn was called with the correct warning message
   */
  it("Warns the user if the user callback for a hook is not a function", async () => {
    window.zeus = new EventEmitter();
    window.zeus.name = "zeus"
    const onInitializeCallback = {};
    const adapter = new ZeusAdapter({
      onInitialize: onInitializeCallback
    });

    await adapter.connect();

    expect(console.warn).toHaveBeenCalledWith(
      "[ZeusAdapter] Hook callback must be a function. Instead received [object]."
    );
  });

  /**
   * Verifies if the user provides a calback to a hook that is just a promise and not a function,
   * that no warnings are printed to the console.
   * NOTE: Since we don't have commands to run at this point, we can't verify the the return
   * is the same promise as the callback variable.
   *
   * 1. Create a callback to onInitilize that is just a promise that resolves
   * 2. Connect the adapter which will trigger the callback to be run via #runCommand
   * 3. Verify no console.warns were called.
   */
  it("Just returns the user callback if it is a promise and not a function", async () => {
    window.zeus = new EventEmitter();
    window.zeus.name = "zeus"
    const onInitializeCallback = Promise.resolve();
    const adapter = new ZeusAdapter({
      onInitialize: onInitializeCallback
    });

    await adapter.connect();

    expect(console.warn).not.toHaveBeenCalled();
  });
});
