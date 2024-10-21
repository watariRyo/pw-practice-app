import { defineConfig, devices } from '@playwright/test'
import type { TestOptions } from './test-options'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '.env') })

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  timeout: 10000,
  globalTimeout: 60000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    // ['allure-playwright'],
    ['html'],
  ],
  use: {
    baseURL: 'http://127.0.0.1:3000',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',

    trace: 'on-first-retry',
    video: {
      mode: 'on',
      size: { width: 1920, height: 1080 },
    },
  },
  projects: [
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4200' },
    },
    {
      name: 'chromium',
    },
    {
      name: 'firefox',
      testMatch: 'hoge.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro'],
      },
    },
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/'
  }
})
