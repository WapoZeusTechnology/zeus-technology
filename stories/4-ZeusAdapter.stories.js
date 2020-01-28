import React, { Fragment } from "react";
import { linkTo } from "@storybook/addon-links";
import { ZeusAd } from "@zeus-technology/ad";
import { ZeusCommands } from "../packages/adapter/lib/ZeusCommands";

import { ZeusAdapter } from "../packages/adapter/lib";

const adapter = new ZeusAdapter({
  init: [
    ZeusCommands.loadScript("//c.amazon-adsystem.com/aax2/apstag.js")
    // () => apstag.init("
  ],
  bid: [],
  render: []
});

export default {
  title: "Custom SSP Module"
};

export const toStorybook = () => (
  <Fragment>
    <h1>
      This ad will <em>not refresh</em> every time you navigate.
    </h1>
    <ZeusAd slotId="mob_bigbox_2" />
  </Fragment>
);

toStorybook.story = {
  name: "A9 example"
};
