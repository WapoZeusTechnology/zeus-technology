"use strict";

import React from "react";
import { ZeusAd } from "../lib";
import renderer from "react-test-renderer";
jest.mock("../../util/lib/zeus-api", () => ({
  ...jest.requireActual("../../util/lib/zeus-api"),
  triggerPersonalizedAdPermissionsChange: jest.fn()
}));

describe("@zeus-platform/ad", () => {
  it("Should render and match snapshot with zeus_", () => {
    const sample = renderer.create(<ZeusAd slotId="zeus_sample0" />);
    expect(sample.toJSON().props.id).toEqual("zeus_sample0");
    expect(sample.toJSON()).toMatchSnapshot();
  });
  it("Should render and match snapshot with zeus-", () => {
    const sample = renderer.create(<ZeusAd slotId="zeus-sample0" />);
    expect(sample.toJSON().props.id).toEqual("zeus_sample0");
    expect(sample.toJSON()).toMatchSnapshot();
  });

  it("Should render and match snapshot without zeus_ or zeus-", () => {
    const sample = renderer.create(<ZeusAd slotId="sample0" />);
    expect(sample.toJSON().props.id).toEqual("zeus_sample0");
    expect(sample.toJSON()).toMatchSnapshot();
  });
  it("Changing the allowPersonalization property...", () => {
    const zeusUtil = require("../../util/lib/zeus-api");
    const triggerSpy = jest.spyOn(
      zeusUtil,
      "triggerPersonalizedAdPermissionsChange"
    );
    renderer.create(<ZeusAd allowPersonalization={true} slotId="sample0" />);
    expect(triggerSpy).toHaveBeenCalledWith(true);
    renderer.create(<ZeusAd allowPersonalization={false} slotId="sample0" />);
    expect(triggerSpy).toHaveBeenCalledWith(false);
  });
});
