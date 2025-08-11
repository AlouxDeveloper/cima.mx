// tests/__mocks__/globalMocks.js

// Mocks para Vuetify helpers que causan problemas en tests
jest.mock('vuetify/lib/util/helpers', () => ({
  remapInternalIcon: jest.fn(() => 'mdi-help-circle'),
}));

// Otros mocks globales si los necesitas:
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

// Mock para localStorage (si usas)
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value.toString();
  }
  removeItem(key) {
    delete this.store[key];
  }
}
global.localStorage = new LocalStorageMock();

// Mock para window.matchMedia (si usas Vuetify o media queries en tests)
global.window.matchMedia = global.window.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};
