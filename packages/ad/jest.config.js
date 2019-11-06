// jest.config.js
const { defaults } = require("jest-config");
module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/coverage/**",
    "!**/*.config.js"
  ],
  collectCoverage: true,
  coverageDirectory: "./coverage"
};
