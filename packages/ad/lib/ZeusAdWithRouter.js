import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { getSlotId, zeusNotice, triggerRerender } from "@zeus-technology/util";

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
  location,
  match,
  history,
  shouldChangeForRoute = () => true,
  changeOnNavigate = true,
  ...props
}) => {
  const lastLocation = useRef(location);
  const useSlotId = getSlotId(slotId);

  // Warn the user if they gave us an invalid property here.
  if (typeof shouldChangeForRoute !== "function") {
    zeusNotice(
      "The `shouldChangeForRoute` prop passed to `ZeusAdWithRouter` is not a function!"
    );
    shouldChangeForRoute = () => true;
  }

  useEffect(() => {
    // We need to know whether or not the route changed, and if the caller thinks
    // that it is a change worthy of an update.
    const shouldTriggerChange =
      lastLocation.current !== location
        ? shouldChangeForRoute(location, lastLocation.current)
        : false;
    lastLocation.current = location;

    // Only change if we're supposed to change for this route.
    if (shouldTriggerChange && changeOnNavigate) {
      triggerRerender(useSlotId);
    }
  }, [shouldChangeForRoute, location, changeOnNavigate, useSlotId]);

  return <ZeusAd slotId={useSlotId} {...props} />;
};

ZeusAdWithRouterImpl.propTypes = {
  slotId: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  changeOnNavigate: PropTypes.bool,
  shouldChangeForRoute: PropTypes.func
};

export const ZeusAdWithRouter = withRouter(ZeusAdWithRouterImpl);
