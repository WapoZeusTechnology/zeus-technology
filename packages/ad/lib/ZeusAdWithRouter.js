import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { getSlotId, zeusNotice, triggerRerender } from "@zeus-technology/util";
import { getNavigationFacts, routesAreEqual } from "./ZeusRouteResponder";

import { ZeusAd } from "./ZeusAd";

/**
 * This component introduces a `zeus-ad` element to present an ad inventory slot in a manner which responds to your Router.
 * @param {Object} props The properties to pass to the `zeus-ad` element.
 * @param {string} props.slotId The ID of the inventory slot.
 * @param {bool} props.changeOnNavigate By default, the ad slots will refresh when the route does. Pass false into this value to disable that functionality.
 * @param {function} props.shouldChangeForRoute A function which determines whether or not we should change the ad based on the new route. This function should take two arguments: the current `location`, and the previous `location` from `react-router-dom`.
 */
const ZeusAdWithRouterImpl = ({
  slotId,
  shouldChangeForRoute = () => true,
  changeOnNavigate = true,
  debug = false,
  ...props
}) => {
  const navigationFacts = getNavigationFacts();
  const useSlotId = getSlotId(slotId);

  // Warn the user if they gave us an invalid property here.
  if (typeof shouldChangeForRoute !== "function") {
    zeusNotice(
      "The `shouldChangeForRoute` prop passed to `ZeusAdWithRouter` is not a function!"
    );
    shouldChangeForRoute = () => true;
  }

  // If we navigated, then we let the caller decide whether or not we rerender.
  const shouldTriggerChange = navigationFacts.navigated
    ? shouldChangeForRoute(navigationFacts.to, navigationFacts.from)
    : false;
  debug &&
    console.debug(
      `ZEUS DEBUG\nConsidering a refresh of ad slot «${useSlotId}» with the following information:`,
      {
        navigationFacts,
        shouldTriggerChange
      }
    );

  // Only change if we're supposed to change for this route.
  if (shouldTriggerChange && changeOnNavigate) {
    triggerRerender(useSlotId);
  }

  return <ZeusAd slotId={useSlotId} {...props} />;
};

ZeusAdWithRouterImpl.propTypes = {
  slotId: PropTypes.string.isRequired,
  debug: PropTypes.bool,
  changeOnNavigate: PropTypes.bool,
  shouldChangeForRoute: PropTypes.func
};

export const ZeusAdWithRouter = withRouter(ZeusAdWithRouterImpl);
