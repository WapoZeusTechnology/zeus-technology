"use strict";

import React, { Fragment } from "react";
import { ZeusAdWithRouter } from "../lib/ZeusAdWithRouter";
import renderer from "react-test-renderer";
import { HashRouter, Route, Link } from "react-router-dom";

describe("@zeus-platform/ad", () => {
  it("Work with router stuff", () => {
    const MyRouteComponent = ({ match }) => (
      <Fragment>
        <h1>Hello</h1>
        <Link to={`/${match.params.index + 1}`}>Increment!</Link>
      </Fragment>
    );
    const sample = renderer.create(
      <HashRouter basename="/">
        <ZeusAdWithRouter slotId="zeus_sample0" />
        <Route path="/:index" component={MyRouteComponent} />
      </HashRouter>
    );
    expect(sample.toJSON()).toMatchSnapshot();
  });

  it("should play nice with different path settings", () => {
    renderer.create();
  });
});
