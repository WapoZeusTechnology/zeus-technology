import React, { Fragment } from "react";
import { linkTo } from "@storybook/addon-links";
import { zeusLoader } from "@zeus-technology/load";
import { ZeusRouteResponder, ZeusAdWithRouter } from "@zeus-technology/ad-rrd";
import { HashRouter, Route, Link } from "react-router-dom";

export default {
  title: "ZeusAdWithRouter"
};

const Foo = () => (
  <div>
    <h1>Foo!</h1>
    <Link to="/bar">Bar!</Link>
    <br />
    <Link to="/baz">Baz!</Link>
    <ZeusAdWithRouter
      debug={true}
      slotId="zeus_mob_bigbox_2"
      shouldChangeForRoute={shouldChangeForRoute}
    />
  </div>
);
const Bar = () => (
  <div>
    <h1>Bar!</h1>
    <Link to="/baz">Baz!</Link>
    <br />
    <Link to="/">Foo!</Link>
    <ZeusAdWithRouter debug={true} okkey={1} slotId="zeus_mob_bigbox_2" />
  </div>
);
const Baz = () => (
  <div>
    <h1>Baz!</h1>
    <Link to="/">Foo!</Link>
    <br />
    <Link to="/bar">Bar!</Link>
    <ZeusAdWithRouter debug={true} okkey={2} slotId="zeus_mob_bigbox_2" />
  </div>
);

const shouldChangeForRoute = () => true;

export const toStorybook = () => (
  <HashRouter basename="/" hashType="noslash">
    <ZeusRouteResponder
      shouldChangeForRoute={shouldChangeForRoute}
      keyValuePairs={{ custom: "value" }}
    />
    <h1>This ad will refresh every time you navigate.</h1>
    <ZeusAdWithRouter
      debug={true}
      slotId="zeus_mob_bigbox_1"
      shouldChangeForRoute={shouldChangeForRoute}
    />
    <Route path="/" exact={true} component={Foo} />
    <Route path="/bar" component={Bar} />
    <Route path="/baz" component={Baz} />
  </HashRouter>
);

toStorybook.story = {
  name: "With react-router-dom"
};
