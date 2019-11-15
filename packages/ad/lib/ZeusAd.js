import React from "react";
import PropTypes from "prop-types";
import { getSlotId } from "@zeus-technology/util";

/**
 * This component introduces a `zeus-ad` element to present an ad inventory slot.
 * @param {Object} props The properties to pass to the `zeus-ad` element.
 * @param {string} props.slotId The ID of the inventory slot.
 * @param {bool} props.debug A debug flag that prints debug messages.
 */
export class ZeusAd extends React.Component {
  constructor(props) {
    super(props);
    this.shouldCount = 0;
  }

  shouldComponentUpdate(nextProps) {
    this.props.debug &&
      console.log(
        `ZEUS DEBUG: ZeusAd\nReconsidering whether or not ${this.props.slotId} should be updated.`
      );
    return !(
      nextProps.slotId === this.props.slotId &&
      nextProps.debug === this.props.debug
    );
  }

  render() {
    const { slotId, debug, ...props } = this.props;
    const useSlotId = getSlotId(slotId);
    debug &&
      console.log(
        `ZEUS DEBUG: ZeusAd\nRe-rendering component! «${useSlotId}».`,
        this.props
      );
    return <zeus-ad class="zeus-ad" id={useSlotId} debug={debug} {...props} />;
  }
}

ZeusAd.propTypes = {
  slotId: PropTypes.string.isRequired,
  debug: PropTypes.bool
};
ZeusAd.defaultProps = {
  debug: false
};
