const path = require("path");

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  return Object.assign(config, { devtool: "eval-source-map" });
};
