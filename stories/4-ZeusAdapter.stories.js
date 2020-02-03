import React, { Fragment } from "react";
import { action } from "@storybook/addon-actions";

import { ZeusAd } from "@zeus-technology/ad";
import { ZeusAdapter } from "../packages/adapter/lib";

export default {
  title: "ZeusAdapter"
};

export const onInitializeStory = () => {
  const adapter = new ZeusAdapter({
    onInitialize: adapter =>
      Promise.resolve().then(() => action("ZeusAdapter.onInitialize")(adapter))
  });
  adapter.connect();

  return (
    <Fragment>
      <h1>Open Actions and verify onInitilize was called</h1>
      {/* <ZeusAd slotId="mob_bigbox_2" /> */}
    </Fragment>
  );
};
onInitializeStory.story = { name: "onInitialize() Hook" };

export const onZeusAdRegisteredStory = () => {
  const adapter = new ZeusAdapter({
    onZeusAdRegistered: (adapter, node) =>
      Promise.resolve().then(() =>
        action("ZeusAdapter.onZeusAdRegistered")(node)
      )
  });
  adapter.connect();

  return (
    <Fragment>
      <h1>
        Open Actions and verify onZeusAdRegistered was called with
        "mob_bigbox_2"
      </h1>
      <ZeusAd slotId="mob_bigbox_2" />
    </Fragment>
  );
};
onZeusAdRegisteredStory.story = { name: "onZeusAdRegistered() Hook" };

export const onBiddingStartStory = () => {
  const adapter = new ZeusAdapter({
    onBiddingStart: (adapter, slots) => {
      Promise.resolve().then(() => {
        action("ZeusAdapter onBiddingStart()")(slots);
      });
    }
  });
  adapter.connect();

  return (
    <Fragment>
      <h1>
        Open Actions and verify onBiddingStart was called with slot mob_bigbox_2
      </h1>
      <ZeusAd slotId="mob_bigbox_2" />
    </Fragment>
  );
};
onBiddingStartStory.story = { name: "onBiddingStart() Hook -> resolves" };

export const failedBidStory = () => {
  const adapter = new ZeusAdapter({
    onBiddingStart: (adapter, slots) =>
      Promise.reject("Bid Rejected in Adapter onBiddingStart")
  });
  adapter.connect();

  return (
    <Fragment>
      <h1>Open console and verify warnings and logs</h1>
      <p>console.warn() should print the following message:</p>
      <pre>
        [CustomSSP] Some or all custom SSPs failed to bid. [{"{"} adapterId:
        "fc579b40-a7a4-4209-b0f5-dda69fa8496d" error: "Bid Rejected in Adapter
        onBiddingStart" success: false {"}"}]
      </pre>
      <p>console.info() should print the following message:</p>
      <pre>SSP responses [ "customSSP:false" ]</pre>
      <ZeusAd slotId="mob_bigbox_2" />
    </Fragment>
  );
};
failedBidStory.story = { name: "onBiddingStart() Hook -> rejects" };
