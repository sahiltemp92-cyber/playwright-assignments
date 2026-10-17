import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
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
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        }
    ],
    testDir: './tests', // optional if its already there
    use: {
        baseURL: 'https://eventhub.rahulshettyacademy.com',

        // Emulates `'prefers-colors-scheme'` media feature.
        colorScheme: 'dark',

        // Context geolocation.
        geolocation: { longitude: 12.492507, latitude: 41.889938 },

        // Emulates the user locale.
        locale: 'en-GB',

        // Grants specified permissions to the browser context.
        permissions: ['geolocation'],

        // Emulates the user timezone.
        timezoneId: 'Asia/Kolkata',

        // Viewport used for all pages in the context.
        viewport: { width: 1280, height: 720 },
        screenshot: 'on',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
        launchOptions: {
            // Disables the "browser is being controlled by automated test software" bar
            headless: false,
            // Slows down the test to make it watchable
            slowMo: 500,
        },

    },
    reporter: [['html', { open: 'always' }]],
    retries: 0,
});