const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { defaults: tsjPreset } = require('ts-jest/presets');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  transform: {
    ...tsjPreset.transform,
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2|pdf)$': 'jest-transform-stub',
  },
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
