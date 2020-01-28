// jest.config.js
const { defaults } = require("jest-config");
module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  collectCoverageFrom: [
    "./packages/*/lib/**/*.{js,jsx}",
  ],
  collectCoverage: true,
  coverageDirectory: "./coverage"
};
