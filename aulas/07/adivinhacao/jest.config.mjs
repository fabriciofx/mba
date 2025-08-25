export default {
  resetMocks: true,
  clearMocks: true,
  resetModules: true,
  restoreMocks: true,
  testEnvironment: "node",
  transform: {},
  moduleFileExtensions: ["js", "json"],
  moduleNameMapper: {
    "^#src/(.*)$": "<rootDir>/src/$1",
    "^#helpers/(.*)$": "<rootDir>/tests/helpers/$1"
  }
};
