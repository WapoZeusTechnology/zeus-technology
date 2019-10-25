/**
 * The purpose of this class is to implement an Adapter for custom
 */
class ZeusAdapter {
  /**
   * Internal config
   */
  #config;

  /**
   * The queue of things waiting until Zeus is available.
   */
  #waitQueue = [];

  constructor(config) {
    this.#config = config;

    this._waitQueueRunner();
  }

  /**
   * The amount of time to wait between queue runs.
   */
  static WaitQueueDelay = 50;

  /**
   * Run the wait queue.
   */
  _waitQueueRunner() {
    // If Zeus isn't ready, give it another bit of time.
    if (!globalThis.hasOwnProperty("zeus")) {
      setTimeout(this._waitQueueRunner.bind(this), ZeusAdapter.WaitQueueDelay);
      return;
    }

    // Handle the possible race condition that we've got multiple outstanding timeouts.
    if (!Array.isArray(this.#waitQueue)) return;

    const nextToRun = this.#waitQueue.shift();
    // If we've run the queue dry, mark the queue as empty
    if (!nextToRun && this.#waitQueue.length === 0) {
      this.#waitQueue = false;

      return;
    }

    // Run the command, and set another timeout.
    nextToRun && nextToRun();
    setTimeout(this._waitQueueRunner.bind(this), ZeusAdapter.WaitQueueDelay);
    return;
  }

  /**
   * A small wrapper to issue commands to Zeus.
   */
  _runInZeus(command) {
    if (typeof command !== "function") {
      throw new Error(
        "ZeusAdapter attempted to run a Zeus command that wasn't a function."
      );
    }

    if (Array.isArray(this.#waitQueue)) {
      this.#waitQueue.push(command);
      return;
    }

    command();
    return;
  }
}

export { ZeusAdapter };
