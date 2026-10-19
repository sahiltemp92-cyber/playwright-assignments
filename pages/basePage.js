import { expect } from "@playwright/test";

export class BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // --- Common Global Layout / Navbar Elements ---
        this.brandLogo = page.getByRole('link', { name: 'EventHub' });
        this.navBrowseEventsLink = page.getByRole('link', { name: 'Events' }).or(page.getByText('Browse Events'));
        this.navMyBookingsLink = page.getByRole('link', { name: 'My Bookings' });
        this.navSignInLink = page.getByRole('link', { name: 'Sign In' });
        this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
        this.userProfileBadge = page.locator('[data-testid="user-profile"], nav span.font-medium');

        // --- Global Feedback & Notifications ---
        this.loadingSpinner = page.locator('span[role="status"][aria-label="Loading"]');
        this.toastNotification = page.locator('div[aria-live="polite"]');
    }

    // ==========================================
    // Navigation & URL Helpers
    // ==========================================

    /**
     * Navigates to a path relative to the baseURL configured in playwright.config.js.
     * @param {string} path - E.g. '/login', '/events', or '/'
     */
    async navigateTo(path = '') {
        await this.page.goto(path);
    }

    /**
     * Wait for page DOM or network to settle.
     * @param {'load'|'domcontentloaded'|'networkidle'} state
     */
    async waitForPageLoad(state = 'domcontentloaded') {
        await this.page.waitForLoadState(state);
    }

    /**
     * Wait for current URL to match expected string or regex.
     * @param {string|RegExp} urlPattern
     */
    async waitForURL(urlPattern) {
        await this.page.waitForURL(urlPattern);
    }

    /**
     * Get the current page title.
     * @returns {Promise<string>}
     */
    async getTitle() {
        return await this.page.title();
    }

    /**
     * Get the current page URL.
     * @returns {string}
     */
    getURL() {
        return this.page.url();
    }

    /**
     * Reload the current page.
     */
    async reload() {
        await this.page.reload();
    }

    /**
     * Go back in browser history.
     */
    async goBack() {
        await this.page.goBack();
    }

    // ==========================================
    // Global Header & Navigation Actions
    // ==========================================

    /**
     * Clicks the brand logo to navigate back to the home/landing page.
     */
    async goToHome() {
        await this.brandLogo.click();
    }

    /**
     * Navigates to the events listing via navbar.
     */
    async goToEvents() {
        await this.navBrowseEventsLink.first().click();
    }

    /**
     * Navigates to the user's booking list via navbar.
     */
    async goToMyBookings() {
        await this.navMyBookingsLink.click();
    }

    /**
     * Signs out of the application if logged in.
     */
    async signOut() {
        if (await this.signOutButton.isVisible()) {
            await this.signOutButton.click();
        }
    }

    // ==========================================
    // UI Helpers & Assertions
    // ==========================================

    /**
     * Waits for any active loading spinners to detach or become hidden.
     */
    async waitForLoadingDisappear() {
        await this.loadingSpinner.waitFor({ state: 'hidden' });
    }

    /**
     * Verifies the page title contains the expected text.
     * @param {string|RegExp} expectedTitle
     */
    async verifyPageTitle(expectedTitle) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    /**
     * Captures a screenshot to the specified path for debugging or reporting.
     * @param {string} filename
     */
    async takeScreenshot(filename) {
        await this.page.screenshot({ path: `screenshots/${filename}.png`, fullPage: true });
    }
}
