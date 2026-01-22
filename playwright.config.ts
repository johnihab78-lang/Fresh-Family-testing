import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './src/tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'on-failure' }],
  ],

  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    // Use the pre-saved authenticated storage state created by global setup
    storageState: process.env.STORAGE_STATE_PATH || './playwright/.auth/adminStorageState.json',
  },

  // Run a global setup once to perform login and save storage state
  globalSetup: './src/utils/global-setup.ts',

  projects: [
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],
});