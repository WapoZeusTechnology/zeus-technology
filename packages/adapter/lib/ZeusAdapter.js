import { ZeusCommands } from "./ZeusCommands";
import { ZeusHooks } from "./ZeusHooks";
import { delay, timeout } from "./utils";

/**
 * The purpose of this class is to implement an Adapter for custom
 */
export class ZeusAdapter {
  /**
   * The amount of time, in ms, to wait between queue runs.
   */
  static WaitQueueDelay = 50; //ms

  /**
   * The maximum amount of time to wait for Zeus
   */
  static ZeusWaitTimeout = 10000; //ms

  /**
   * Internal config
   */
  #config;

  /**
   * True when adapter is connected to a zeus instance.
   */
  #zeusConnected = false;

  /**
   * Creates the zeus adapter instance and verifies the config is correct. All callbacks that
   * the user is registering with ZeusAdapter must be placed in the config object.
   *
   * @param {object} config The configuration
   */
  constructor(config = {}) {
    this.#config = config;
    this.#connectCommands();
    // TODO verify configuration
  }

  /**
   * Connect the ZeusAdapter to zeus and then attach all the event listener hooks that the user
   * provided on the config.
   *
   * Will throw an error if timeout occurs waiting to connect to zeus.
   *
   * @return {Promise} Resolves if connect is successful, rejects if a timeout occurs.
   */
  connect() {
    return Promise.race([
      // Promise chain to wait until zeus lib is available then connect all user hooks
      this.#waitForZeus()
        .then(() => (this.#zeusConnected = true))
        .then(this.#connectHooks),

      // Rejects after timeout.
      timeout(
        "Timeout waiting to connect to Zeus.",
        ZeusAdapter.ZeusWaitTimeout
      )
    ]);
  }

  /**
   * Wait for Zeus to be ready. Zeus is ready when we can see zeus on the global object as the last
   * thing Zeus does while starting up is attach itself to the object.
   */
  #waitForZeus() {
    const isZeusReady = () =>
      globalThis.hasOwnProperty("zeus") && !!globalThis.zeus;

    // Return a promise which resolves once Zeus is ready.
    return new Promise(async resolve => {
      while (!isZeusReady()) {
        await delay(ZeusAdapter.WaitQueueDelay);
      }

      return resolve(globalThis.zeus);
    });
  }

  /**
   * Connect all hooks the user has requested to the zeus events.
   */
  #connectHooks = () => {
    Object.entries(ZeusHooks).forEach(([hookFunctionName, connectHook]) => {
      if (this.#config.hasOwnProperty(hookFunctionName)) {
        const hookCallback = this.#config[hookFunctionName];
        connectHook(this, (...params) =>
          this.#runCommand(hookCallback, ...params)
        );
      }
    });
  };

  #connectCommands = () => {
    Object.entries(ZeusCommands).forEach(([commandName, commandFunction]) => {
      this[commandName] = (...params) =>
        this.#runCommand(commandFunction, ...params);
    });
  };

  #runCommand = async (cmd, ...params) => {
    if (!this.#zeusConnected) {
      throw new Error(
        "Zeus is not connected. Either Zeus did not initialize or you may have forgotten to call `adapter.connect()`"
      );
    }

    // If we somehow get a Promise, just return it.
    if (cmd instanceof Promise) {
      return cmd;
    }

    // Make sure that we have a Function
    if (typeof cmd !== "function") {
      console.warn("Command is not a function!", cmd);
      throw new Error(
        "ZeusAdapter attempted to run a Zeus command that wasn't a function."
      );
    }

    // Coerce it into a promise
    return Promise.resolve().then(cmd(...params));
  };
}
