module.exports = {
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  moduleFileExtensions: ['js', 'json', 'vue', 'mjs'],
  transformIgnorePatterns: ['/node_modules/(?!(swiper)/)'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^vue-lottie$': '<rootDir>/tests/__mocks__/vue-lottie.js',
    "/^@\/(.*)$/": "C:\Users\jessi\proyecto\DAJJ-develop\frontend\$1"  
  },
  testEnvironment: 'jsdom',
};
