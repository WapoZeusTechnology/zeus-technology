/**
 * List and description of all hooks that are publically available to the Zeus Adapter. A hook is a
 * callback function that will be called whenever the event happens in the Zeus library. Only hooks
 * that have been registered in the configuration will be added to the adapter instance.
 */
export const ZeusHooks = {
  onInitialize: (adapter, userCallback) => userCallback(adapter),
  onZeusAdRegistered: (adapter, userCallback) => {
    globalThis.zeus.on("NODE_CONNECTED", node => {
      return userCallback(adapter, node.id);
    });
  },
  onBiddingStart: (adapter, userCallback) => {
    // register with Zeus
    const adapterId = "random_id";
    globalThis.zeus.emit("REGISTER_CUSTOM_BIDDER", { adapterId });

    // Setup callback when bidding has started
    globalThis.zeus.on("CUSTOM_BIDDING_START", slots => {
      Promise.resolve()
        .then(() =>
          userCallback(
            adapter,
            slots.map(slot => slot.id)
          )
        )
        .then(() =>
          globalThis.zeus.emit("CUSTOM_BIDDING_FINISHED", {
            adapterId,
            success: true
          })
        )
        .catch(error => {
          globalThis.zeus.emit("CUSTOM_BIDDING_FINISHED", {
            adapterId,
            error,
            success: false
          });
        });
    });
  }
};

Object.freeze(ZeusHooks);
