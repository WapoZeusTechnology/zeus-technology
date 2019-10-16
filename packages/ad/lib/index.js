import { ZeusAd } from "./ZeusAd";

// All of this fun is to prevent folks without react-router-dom from going boom.
let ZeusAdWithRouter = () => {
  throw new Error("ZeusAdWithRouter did not load properly.");
};
let ZeusRouteResponder = () => {
  throw new Error("ZeusRouteResponder did not load properly.");
};

try {
  ZeusAdWithRouter = require("./ZeusAdWithRouter").ZeusAdWithRouter;
  ZeusRouteResponder = require("./ZeusRouteResponder").ZeusRouteResponder;
} catch (e) {
  console.warn(
    "You do not presently have react-router-dom installed. If you wish to use ZeusAdWithRouter and ZeusRouteResponder, you will need to install that module."
  );
}

export { ZeusAd, ZeusAdWithRouter, ZeusRouteResponder };
