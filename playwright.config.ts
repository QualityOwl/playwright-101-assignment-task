import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  /* Do not run tests in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'results/test-results.xml' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'safari',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Chrome @ LambdaTest',
      use: {
        browserName: 'chromium',
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify({
              browserName: 'Chrome',
              browserVersion: 'latest',
              'LT:Options': {
                platform: 'Windows 11',
                build: 'Playwright 101',
                name: 'Round #2 Assignment',
                user: process.env.LT_USERNAME,
                accessKey: process.env.LT_ACCESS_KEY,
                network: true,
                video: true,
                console: true,
                geoLocation: 'US',
                timezone: 'Chicago'
              },
            })
          )}`,
        },
      },
    },
    {
      name: 'Edge @ LambdaTest',
      use: {
        browserName: 'chromium',
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify({
              browserName: 'MicrosoftEdge',
              browserVersion: 'latest',
              'LT:Options': {
                platform: 'Windows 11',
                build: 'Playwright 101',
                name: 'Round #2 Assignment',
                user: process.env.LT_USERNAME,
                accessKey: process.env.LT_ACCESS_KEY,
                network: true,
                video: true,
                console: true,
                geoLocation: 'US',
                timezone: 'Chicago'
              },
            })
          )}`,
        },
      },
    }
  ]
});