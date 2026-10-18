import { expect } from "@playwright/test"

export class EventsListPage {
    constructor(page) {
        this.page = page
        this.upcomingEventsHeader = page.getByRole('heading', { name: 'Upcoming Events' })
        this.searchEventsTextbox = page.getByPlaceholder('Search events, venues…')
        this.categoryDropdown = page.locator("//select[contains(.,'All Categories')]")
        this.cityDropdown = page.locator("//select[contains(.,'All Cities')]")
    }

    async verifyUpcomingEventsHeader() {
        await expect(this.upcomingEventsHeader).toBeVisible()
    }

    async searchEvents(text) {
        await this.searchEventsTextbox.fill(text)
    }

    async selectCategory(category) {
        await this.categoryDropdown.selectOption(category)
    }

    async selectCity(city) {
        await this.cityDropdown.selectOption(city)
    }

    async isCategoryDisplayed(category) {
        await expect(this.page.locator(`//a[contains(.,'${category}')]`)).toBeVisible()
    }
}