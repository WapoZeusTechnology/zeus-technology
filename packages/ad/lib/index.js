import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
/**
 * This component introduces a `zeus-ad` element to present an ad inventory slot.
 * @param {Object} props The properties to pass to the `zeus-ad` element.
 * @param {string} props.slotId The ID of the inventory slot.
 */
export const ZeusAd = withRouter(
  ({ slotId, changeOnNavigate = true, ...props }) => {
    const useSlotId = `zeus_${slotId.replace(/^zeus[_-]/, "")}`;

    if (changeOnNavigate) {
      const element = document.getElementById(useSlotId);
      element && !!element.render && element.render();
    }

    return <zeus-ad id={useSlotId} {...props} />;
  }
);

ZeusAd.propTypes = {
  slotId: PropTypes.string.isRequired,
  changeOnNavigate: PropTypes.bool
};
