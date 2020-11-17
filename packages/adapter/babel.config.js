// babel.config.js

module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    ["@babel/plugin-proposal-private-methods", { loose: false }],
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
  ],
  ignore: ["node_modules"],
};
