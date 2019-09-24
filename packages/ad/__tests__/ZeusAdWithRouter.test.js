"use strict";

import React from "react";
import { ZeusAd, ZeusAdWithRouter } from "../lib";
import renderer from "react-test-renderer";
import { HashRouter } from "react-router-dom";

describe("@zeus-platform/ad", () => {
  it("Should render and match snapshot with zeus_", () => {
    const sample = renderer.create(
      <HashRouter basename="/">
        <ZeusAd slotId="zeus_sample0" />
      </HashRouter>
    );
    expect(sample.toJSON().props.id).toEqual("zeus_sample0");
    expect(sample.toJSON()).toMatchSnapshot();
  });
});
