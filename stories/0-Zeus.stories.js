import React, { Fragment } from "react";
import { linkTo } from "@storybook/addon-links";
import { zeusLoader } from "@zeus-technology/load";
import {
  ZeusAd,
  ZeusAdWithRouter,
  ZeusRouteResponder
} from "@zeus-technology/ad";
import { HashRouter, Route, Link } from "react-router-dom";

export default {
  title: "Welcome"
};

const Foo = () => (
  <div>
    <h1>Foo!</h1>
    <Link to="/bar">Bar!</Link>
  </div>
);
const Bar = () => (
  <div>
    <h1>Bar!</h1>
    <Link to="/">Foo!</Link>
  </div>
);

export const toStorybook = () => (
  <HashRouter basename="/" hashType="noslash">
    <ZeusRouteResponder />
    <h1>This ad will refresh every time you navigate.</h1>
    <ZeusAdWithRouter slotId="mob_bigbox_1" />
    <h1>
      This ad will <em>not refresh</em> every time you navigate.
    </h1>
    <ZeusAd slotId="mob_bigbox_2" />
    <Route path="/" exact={true} component={Foo} />
    <Route path="/bar" component={Bar} />
  </HashRouter>
);

toStorybook.story = {
  name: "to Zeus!"
};
