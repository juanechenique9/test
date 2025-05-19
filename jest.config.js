module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@models/(.*)': '<rootDir>/src/app/models/$1',
    '@utils/(.*)': '<rootDir>/src/app/utils/$1',
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
  },
  modulePaths: [
    '<rootDir>',
  ],
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};