import React, { Fragment } from "react";
import { linkTo } from "@storybook/addon-links";
import { zeusLoader } from "@zeus-technology/load";
import { ZeusAd } from "@zeus-technology/ad";
import { forceRefresh, forceRebuildAndRefresh } from "@zeus-technology/util";

export default {
  title: "ZeusAd force refresh"
};

class RefreshTrigger extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    let ads =
      this.props.ads === "all"
        ? [...document.getElementsByClassName("zeus-ad")].map(node => node.id)
        : this.props.ads;

    if (this.props.type === "refresh") {
      forceRefresh(ads);
    } else {
      forceRebuildAndRefresh(ads);
    }
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Force {this.props.type} on {this.props.ads}
      </button>
    );
  }
}

export const toStorybook = () => (
  <Fragment>
    <h1>
      This ad will <em>not refresh</em> every time you navigate.
    </h1>
    <RefreshTrigger type="refresh" ads="all" />
    <RefreshTrigger type="refresh" ads="zeus_mob_bigbox_2" />
    <br />
    <RefreshTrigger type="rebuild" ads="all" />
    <RefreshTrigger type="rebuild" ads="zeus_mob_bigbox_2" />

    <ZeusAd slotId="zeus_mob_bigbox_2" debug={true} />
    <br />
    <ZeusAd slotId="zeus_mob_bigbox_1" debug={true} />
  </Fragment>
);

toStorybook.story = {
  name: "Simple ZeusAd with refresh"
};
