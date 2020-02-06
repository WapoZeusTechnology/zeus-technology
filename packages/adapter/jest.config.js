// jest.config.js
module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  modulePathIgnorePatterns: ["/node_modules/", "/dist/"],
  collectCoverageFrom: ["./lib/**/*.{js,jsx}"],
  collectCoverage: true,
  coverageDirectory: "./coverage"
};
