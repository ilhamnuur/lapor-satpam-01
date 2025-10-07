import 'jest-postgres';
import app from '../app.js';

// Create test process environment
beforeEach(() => {
  jest.isolateModules(() => {
    require('../app.js');
  });
});

afterAll(() => {
  jest.clearAllMocks();
});

// Provide mocking capabilities for pg
const mockPg = {
  Client: jest.fn(() => ({
    query: jest.fn()
  }))
};

jest.mock('pg', () => mockPg);