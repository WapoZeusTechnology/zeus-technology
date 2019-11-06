const ScriptLoadWaitDelay = 20;
const scriptDone = id => !!document.getElementById(id);
const scriptDelay = () =>
  new Promise(resolve => setTimeout(resolve, ScriptLoadWaitDelay));

let inBidding = false;

export const ZeusCommands = {
  loadScript: async (scriptUrl, scriptId) => {
    globalThis.zeus.emit("CUSTOM_LOAD_SCRIPT", {
      scriptId,
      scriptUrl
    });

    // Sit in a wait loop until the script is ready.
    // TODO: Should probably have a timeout here.
    while (!scriptDone()) {
      await scriptDelay();
    }

    return Promise.resolve();
  },
  biddingStarted: () => (inBidding = true),
  biddingSuccess: () => {
    inBidding &&
      globalThis.zeus.emit("CUSTOM_BIDDING_FINISHED", { isSuccess: true });
    inBidding = false;
    return Promise.resolve();
  },
  biddingFail: (err = null) => {
    inBidding &&
      globalThis.zeus.emit("CUSTOM_BIDDING_FINISHED", {
        isSuccess: false,
        error: err
      });
    inBidding = false;
    return Promise.resolve();
  }
};
Object.freeze(ZeusCommands);
