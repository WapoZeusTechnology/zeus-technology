import React, { useEffect } from "react";
import PropTypes from "prop-types";
/**
 * This component introduces a `zeus-ad` element to present an ad inventory slot.
 * @param {Object} props The properties to pass to the `zeus-ad` element.
 * @param {string} props.slotId The ID of the inventory slot.
 */
export const ZeusAd = ({ slotId, navigationPath, ...props }) => {
  const useSlotId = `zeus_${slotId.replace(/^zeus[_-]/, "")}`;

  useEffect(() => {
    const element = document.getElementById(useSlotId);
    element && element.rerender();
  });

  return <zeus-ad id={useSlotId} {...props} />;
};

ZeusAd.propTypes = {
  slotId: PropTypes.string.isRequired,
  navigationPath: PropTypes.string
};
