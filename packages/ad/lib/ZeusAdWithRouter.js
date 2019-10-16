import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { getSlotId, zeusNotice, triggerRerender } from "@zeus-technology/util";
import {
  getNavigationFacts,
  routesAreEqual,
  routeResponderReady,
  lockZeusElement
} from "./ZeusRouteResponder";

import { ZeusAd } from "./ZeusAd";

/**
 * This component introduces a `zeus-ad` element to present an ad inventory slot in a manner which responds to your Router.
 * @param {Object} props The properties to pass to the `zeus-ad` element.
 * @param {string} props.slotId The ID of the inventory slot.
 * @param {bool} props.changeOnNavigate By default, the ad slots will refresh when the route does. Pass false into this value to disable that functionality.
 * @param {function} props.shouldChangeForRoute A function which determines whether or not we should change the ad based on the new route. This function should take two arguments: the current `location`, and the previous `location` from `react-router-dom`.
 * @param {bool} props.debug A debug flag that prints debug messages.
 */
const ZeusAdWithRouterImpl = ({
  slotId,
  location,
  shouldChangeForRoute = () => true,
  changeOnNavigate = true,
  debug = false,
  ...props
}) => {
  const navigationFacts = getNavigationFacts();
  const useSlotId = getSlotId(slotId);

  // Warn folks if there's no route responder in play.
  if (!routeResponderReady) {
    zeusNotice(
      "There is no `ZeusRouteResponder` ready. " +
        "Please add one inside your Router. See README.md for more details."
    );
  }

  // Warn the user if they gave us an invalid property here.
  if (typeof shouldChangeForRoute !== "function") {
    zeusNotice(
      "The `shouldChangeForRoute` prop passed to `ZeusAdWithRouter` is not a function!"
    );
    shouldChangeForRoute = () => true;
  }

  useEffect(() => {
    // If we navigated, then we let the caller decide whether or not we rerender.
    const shouldTriggerChange = navigationFacts.navigated
      ? shouldChangeForRoute(navigationFacts.to, navigationFacts.from) &&
        lockZeusElement(useSlotId)
      : false;
    debug &&
      console.debug(
        `ZEUS DEBUG: ZeusAdWithRouter\nConsidering a refresh of ad slot «${useSlotId}» with the following information:`,
        {
          navigationFacts,
          changeOnNavigate,
          shouldTriggerChange
        }
      );

    // Only change if we're supposed to change for this route.
    if (shouldTriggerChange && changeOnNavigate) {
      triggerRerender(useSlotId);
    }
  }, [
    slotId,
    navigationFacts,
    shouldChangeForRoute,
    debug,
    useSlotId,
    location,
    changeOnNavigate
  ]);

  return (
    <ZeusAd
      ignore={!shouldTriggerChange}
      slotId={useSlotId}
      debug={debug}
      {...props}
    />
  );
};

ZeusAdWithRouterImpl.propTypes = {
  slotId: PropTypes.string.isRequired,
  debug: PropTypes.bool,
  location: PropTypes.object.isRequired,
  changeOnNavigate: PropTypes.bool,
  shouldChangeForRoute: PropTypes.func
};

export const ZeusAdWithRouter = withRouter(ZeusAdWithRouterImpl);
