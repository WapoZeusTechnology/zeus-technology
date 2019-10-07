import React, { Fragment } from "react";
import { linkTo } from "@storybook/addon-links";
import { zeusLoader } from "@zeus-technology/load";
import { ZeusAd } from "@zeus-technology/ad";

console.log("ZeusAd is...", ZeusAd);

export default {
  title: "ZeusAd Minimalism"
};

export const toStorybook = () => (
  <Fragment>
    <h1>
      This ad will <em>not refresh</em> every time you navigate.
    </h1>
    <ZeusAd slotId="zeus_mob_bigbox_2" />
  </Fragment>
);

toStorybook.story = {
  name: "Simple ZeusAd"
};
