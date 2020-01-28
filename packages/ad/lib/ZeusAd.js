import React from "react";
import PropTypes from "prop-types";
import {
  getSlotId,
  triggerPersonalizedAdPermissionsChange
} from "@zeus-technology/util";

/**
 * This component introduces a `zeus-ad` element to present an ad inventory slot.
 * @param {Object} props The properties to pass to the `zeus-ad` element.
 * @param {string} props.slotId The ID of the inventory slot.
 * @param {bool} props.debug A debug flag that prints debug messages.
 * @param {bool} props.allowPersonalization A boolean flag allowing the display of personalization in the advertisements.
 *
 * NOTE: If you use the `allowPersonalization` prop, it is best if _all_ ad slots have the same value for this. We put
 *       this prop in the `ZeusAd` component so that it can respond to change faster, but this value should not be
 *       changed more than once during any given page load, and all `ZeusAd` instances should share the same value.
 */
export class ZeusAd extends React.Component {
  constructor(props) {
    super(props);
    triggerPersonalizedAdPermissionsChange(props.allowPersonalization);

    return;
  }

  shouldComponentUpdate(nextProps) {
    this.props.debug &&
      console.log(
        `ZEUS DEBUG: ZeusAd\nReconsidering whether or not ${this.props.slotId} should be updated.`
      );

    // Handle the changing of personalization flag changes.
    if (nextProps.allowPersonalization !== this.props.allowPersonalization) {
      triggerPersonalizedAdPermissionsChange(nextProps.allowPersonalization);
    }

    return !(
      nextProps.slotId === this.props.slotId &&
      nextProps.debug === this.props.debug
    );
  }

  node() {
    return document.getElementById(getSlotId(this.props.slotId));
  }

  render() {
    const { slotId, debug, ...props } = this.props;
    const useSlotId = getSlotId(slotId);
    debug &&
      console.log(
        `ZEUS DEBUG: ZeusAd\nRe-rendering component! «${useSlotId}».`,
        JSON.parse(JSON.stringify(this.props))
      );
    return <zeus-ad class="zeus-ad" id={useSlotId} debug={debug} {...props} />;
  }
}

ZeusAd.propTypes = {
  slotId: PropTypes.string.isRequired,
  allowPersonalization: PropTypes.bool,
  debug: PropTypes.bool
};
ZeusAd.defaultProps = {
  allowPersonalization: true,
  debug: false
};
