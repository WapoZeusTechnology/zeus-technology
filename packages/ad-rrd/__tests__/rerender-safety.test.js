import React, { Fragment } from "react";
import { MemoryRouter, Route, Link } from "react-router-dom";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import * as util from "@zeus-technology/util";
import { ZeusAd } from "@zeus-technology/ad";
import { ZeusRouteResponder } from "../lib/ZeusRouteResponder";
import { ZeusAdWithRouter } from "../lib/ZeusAdWithRouter";
jest.mock("@zeus-technology/util");
util.getSlotId = jest.fn().mockImplementation(x => `zeus_${x}`);

beforeEach(() => {
  util.getSlotId.mockClear();
  util.triggerRerender.mockClear();
  util.triggerKeyValuePairsUpdate.mockClear();
});

afterEach(() => {});

describe("TestRenderer ZeusAd", () => {
  test("No re-renders for the same props!", () => {
    const sample = Enzyme.mount(<ZeusAd slotId="mob_bigbox_2" />);
    expect(util.getSlotId.mock.calls).toEqual([["mob_bigbox_2"]]);
    sample.setProps({ slotId: "mob_bigbox_2" });
    expect(util.getSlotId.mock.calls).toEqual([["mob_bigbox_2"]]);
    sample.setProps({ slotId: "mob_bigbox_3" });
    expect(util.getSlotId.mock.calls).toEqual([
      ["mob_bigbox_2"],
      ["mob_bigbox_3"]
    ]);
  });
});

describe("ZeusRouteResponder and ZeusAdWithRoute", () => {
  test("No re-renders for the same props!", () => {
    const sample = Enzyme.mount(
      <MemoryRouter basename="/">
        <ZeusRouteResponder debug={true} shouldChangeForRoute={() => true} />
        <ZeusAdWithRouter
          debug={true}
          slotId="mob_bigbox_2"
          shouldChangeForRoute={() => true}
        />
        <Route
          path="*"
          render={() => (
            <Fragment>
              <ZeusAdWithRouter
                slotId="mob_bigbox_3"
                debug={true}
                shouldChangeForRoute={() => true}
              />
              <Link to="/one" id="test1">
                Click me!
              </Link>
              <Link id="test2" to="/">
                Click me!
              </Link>
            </Fragment>
          )}
        />
      </MemoryRouter>,
      { context: { fake: "context" } }
    );

    // First, make sure a couple initial re-renders won't break things.
    {
      // For KVPs
      expect(util.triggerKeyValuePairsUpdate.mock.calls.length).toBe(0);
      sample.setContext({ fake: "context" });
      expect(util.triggerKeyValuePairsUpdate.mock.calls.length).toBe(0);
      sample.setContext({ fake: "context" });
      expect(util.triggerKeyValuePairsUpdate.mock.calls.length).toBe(0);

      // For triggerRerender
      expect(util.triggerRerender.mock.calls.length).toBe(0);
    }

    // Now, let's make sure that the click event triggers everything we want
    {
      sample.find("a#test1").simulate("click", { button: 0 });

      // For KVPs
      expect(util.triggerKeyValuePairsUpdate.mock.calls.length).toBe(1);

      // For rerenders
      expect(util.triggerRerender.mock.calls).toEqual([
        ["zeus_mob_bigbox_2"],
        ["zeus_mob_bigbox_3"]
      ]);
    }

    // Just once more, for safety, let's make sure that firing a context
    // again doesn't trigger a KVP event
    {
      sample.setContext({ fake: "context" });
      expect(util.triggerKeyValuePairsUpdate.mock.calls.length).toBe(1);

      // For rerenders
      expect(util.triggerRerender.mock.calls).toEqual([
        ["zeus_mob_bigbox_2"],
        ["zeus_mob_bigbox_3"]
      ]);
    }
  });
});
