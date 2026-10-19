import { test, expect } from "@playwright/test"
import { BasePage } from "./basePage";

export class BookingDetailsPage extends BasePage {
    constructor(page) {
        super(page)
        this.bookingReferenceNumber = page.locator("span.bg-indigo-50")
        this.bookingStatus = page.locator("span.ring-1")
        this.bookingHeader = page.locator('h1:visible')
        // Event details
        this.bookingEventTitle = page.locator("//span[contains(., 'Event')]/following-sibling::span")
        this.bookingCategory = page.locator("//span[contains(., 'Category')]/following-sibling::span")
        this.bookingDate = page.locator("//span[contains(., 'Date')]/following-sibling::span")
        this.bookingVenue = page.locator("//span[contains(., 'Venue')]/following-sibling::span")
        this.bookingCity = page.locator("//span[contains(., 'City')]/following-sibling::span")
        // Customer details
        this.bookingName = page.locator("//span[contains(., 'Name')]/following-sibling::span")
        this.bookingEmail = page.locator("//span[contains(., 'Email')]/following-sibling::span")
        this.bookingPhone = page.locator("//span[contains(., 'Phone')]/following-sibling::span")
        // Payment details
        this.bookingTicketQuantity = page.locator("//span[contains(., 'Tickets')]/following-sibling::span")
        this.pricePerTicket = page.locator("//span[contains(., 'Price per ticket')]/following-sibling::span")
        this.totalPrice = page.locator("//span[contains(., 'Total Paid')]/following-sibling::span")

    }

    async getBookingDetails() {
        const bookingEventTitle = await this.bookingEventTitle.textContent()
        const bookingCategory = await this.bookingCategory.textContent()
        const bookingDate = await this.bookingDate.textContent()
        const bookingVenue = await this.bookingVenue.textContent()
        const bookingCity = await this.bookingCity.textContent()
        const bookingName = await this.bookingName.textContent()
        const bookingEmail = await this.bookingEmail.textContent()
        const bookingPhone = await this.bookingPhone.textContent()
        const bookingTicketQuantity = await this.bookingTicketQuantity.textContent()
        const pricePerTicket = await this.pricePerTicket.textContent()
        const totalPrice = await this.totalPrice.textContent()
        return { bookingEventTitle, bookingCategory, bookingDate, bookingVenue, bookingCity, bookingName, bookingEmail, bookingPhone, bookingTicketQuantity, pricePerTicket, totalPrice }
    }

    async verifyBookingDetails(expectedBookingDetails) {
        const actualBookingDetails = await this.getBookingDetails()
        expect(actualBookingDetails.bookingEventTitle).toBe(expectedBookingDetails.bookingEventTitle)
        expect(actualBookingDetails.bookingCategory).toBe(expectedBookingDetails.bookingCategory)
        expect(actualBookingDetails.bookingDate).toBe(expectedBookingDetails.bookingDate)
        expect(actualBookingDetails.bookingVenue).toBe(expectedBookingDetails.bookingVenue)
        expect(actualBookingDetails.bookingCity).toBe(expectedBookingDetails.bookingCity)
        expect(actualBookingDetails.bookingName).toBe(expectedBookingDetails.bookingName)
        expect(actualBookingDetails.bookingEmail).toBe(expectedBookingDetails.bookingEmail)
        expect(actualBookingDetails.bookingPhone).toBe(expectedBookingDetails.bookingPhone)
        expect(actualBookingDetails.bookingTicketQuantity).toBe(expectedBookingDetails.bookingTicketQuantity)
        expect(actualBookingDetails.pricePerTicket).toBe(expectedBookingDetails.pricePerTicket)
        expect(actualBookingDetails.totalPrice).toBe(expectedBookingDetails.totalPrice)
    }
}