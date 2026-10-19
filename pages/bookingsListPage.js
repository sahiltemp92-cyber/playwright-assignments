export class MyBookingsListPage {
    constructor(page) {
        this.page = page
        this.bookingListHeader = page.getByRole('heading', { name: 'My Bookings' })
        this.allBookedEvents = page.locator("#booking-card")
    }

    async getProductCount() {
        return await this.allBookedEvents.count()
    }

    async verifyMyBookingsPageLoad() {
        await expect(this.bookingListHeader).toBeVisible()
    }

    async viewBookingDetails(bookingRefNumber) {
        const bookingRef = this.page.locator("span.booking-ref", { hasText: bookingRefNumber })
        // Go up to the parent booking card
        const parentBookingCard = bookingRef.locator("xpath=ancestor::div[@data-testid='booking-card']")
        const viewDetailsButton = (parentBookingCard.locator(this.page.locator('button').filter({ hasText: 'View Details' }))).first()
        await viewDetailsButton.click()
    }
}