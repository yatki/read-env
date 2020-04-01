// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  collectCoverage: true,

  coveragePathIgnorePatterns: ['/node_modules|dist/', 'rollup.config.ts'],

  collectCoverageFrom: ['src/*.ts'],

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
