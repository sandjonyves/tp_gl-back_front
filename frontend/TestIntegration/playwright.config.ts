import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir:"./TestIntegration",
  use: {
    baseURL: 'http://localhost:3001', 
  },
});