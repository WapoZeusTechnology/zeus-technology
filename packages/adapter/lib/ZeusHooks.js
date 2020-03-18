import uuid from "uuid/v4";
/**
 * List and description of all hooks that are publically available to the Zeus Adapter. A hook is a
 * callback function that will be called whenever the event happens in the Zeus library. Only hooks
 * that have been registered in the configuration will be added to the adapter instance.
 */
export const ZeusHooks = {
  onInitialize: (adapter, userCallback) => userCallback(adapter),
  onZeusAdRegistered: (adapter, userCallback) => {
    // Register for notices on nodes connected
    window.zeus.on("NODE_CONNECTED", node => {
      return userCallback(adapter, node.id);
    });

    // For all nodes already connected, call the callback
    if (Array.isArray(window.zeus.adNodes)) {
      window.zeus.adNodes.forEach(node => {
        userCallback(adapter, node.id);
      });
    }
  },
  onBiddingStart: (adapter, userCallback) => {
    // register with Zeus
    const adapterId = uuid();
    window.zeus.emit("REGISTER_CUSTOM_BIDDER", { adapterId });

    // Setup callback when bidding has started
    window.zeus.on("CUSTOM_BIDDING_START", slots => {
      Promise.resolve()
        .then(() => userCallback(adapter, slots))
        .then(() =>
          window.zeus.emit("CUSTOM_BIDDING_FINISHED", {
            adapterId,
            success: true
          })
        )
        .catch(error => {
          window.zeus.emit("CUSTOM_BIDDING_FINISHED", {
            adapterId,
            error,
            success: false
          });
        });
    });
  }
};

Object.freeze(ZeusHooks);
