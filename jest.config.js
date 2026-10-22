const nextJest = require('next/jest.js');

const createJestConfig = nextJest({dir: './'});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {'^@/(.*)$': '<rootDir>/src/$1'},
  testPathIgnorePatterns: ['/node_modules/', '/e2e/', '/.next/'],
};

module.exports = createJestConfig(config);
