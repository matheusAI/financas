// @ts-check
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config({ path: '.env' });

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,   // testes compartilham estado Supabase — roda em série
  retries: 0,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: 'http://127.0.0.1:4321',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    // 1. Setup: faz login e salva sessão
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
    },
    // 2. Testes principais usam a sessão salva
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/state.json',
      },
      dependencies: ['setup'],
    },
  ],

  // Sobe o servidor Next.js antes dos testes
  webServer: {
    command: 'npm run serve',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: true,
    timeout: 15_000,
  },
});
