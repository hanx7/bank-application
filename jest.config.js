module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
