"use strict";

import { ZeusCommands } from "./ZeusCommands";
/**
 * The purpose of this class is to implement an Adapter for custom
 */
class ZeusAdapter {
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
   * Is zeus ready?
   */
  #zeusReady = false;

  constructor(config = {}) {
    this.#config = config;
  }

  /**
   * Start the ZeusAdapter
   */
  start() {
    // Start the queue.
    return this._waitForZeus()
      .then(() => (this.#zeusReady = true))
      .then(() =>
        globalThis.zeus.on("CUSTOM_BIDDING_START", slots =>
          this.startBidding(slots)
        )
      )
      .then(() =>
        // The value exists
        this.#config.hasOwnProperty("init") &&
        // It is either a function
        (typeof this.#config.init === "function" ||
          // or a Promise
          this.#config.init instanceof Promise)
          ? this.runCommand(() => this.#config.init(this))
          : // If not, just return an empty resolve.
            Promise.resolve()
      );
  }

  startBidding(slots) {
    // In the off chance that we have no bidders configured, notify.
    if (!this.#config.hasOwnProperty("bid")) {
      const errMsg = "No custom bidders configured.";
      console.warn(errMsg);
      globalThis.zeus.emit("CUSTOM_BIDDING_FINISHED", {
        isSuccess: false,
        error: errMsg
      });
      return Promise.reject(errMsg);
    }

    ZeusCommands.biddingStarted();
    return this.runCommand(() => this.#config.bid(this, slots))
      .then(ZeusCommands.biddingSuccess)
      .catch(ZeusCommands.biddingFail);
  }

  /**
   * Wait for Zeus to be ready.
   */
  _waitForZeus() {
    // TODO: Implement timeout.
    const isZeusReady = () =>
      globalThis.hasOwnProperty("zeus") && !!globalThis.zeus;
    const delay = () =>
      new Promise(resolve =>
        setTimeout(() => resolve(), ZeusAdapter.WaitQueueDelay)
      );

    // Return a promise which resolves once Zeus is ready.
    return new Promise(async resolve => {
      while (!isZeusReady()) {
        await delay();
      }

      return resolve(globalThis.zeus);
    });
  }
  runCommand(cmd) {
    if (!this.#zeusReady) {
      throw new Error("Zeus is not yet ready!");
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
    return Promise.resolve().then(cmd);
  }
}

export { ZeusAdapter };
