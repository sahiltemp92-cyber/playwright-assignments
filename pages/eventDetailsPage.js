export class EventDetailsPage {
    constructor(page) {
        this.page = page
        this.ticketCountText = page.locator('#ticket-count')
        this.incrementProductCountButton = page.getByRole('button', { name: '+' })
        this.decrementProductCountButton = page.getByRole('button', { name: '-' })
        this.confirmBookingButton = page.getByRole('button', { name: 'Confirm Booking' })
        this.nameTextbox = page.getByPlaceholder('Your full name')
        this.emailIDTextbox = page.getByPlaceholder('you@email.com')
        this.phoneTextbox = page.getByPlaceholder("+91 98765 43210")
        this.bookingConfirmationHeader = page.getByRole('heading', { name: 'Booking Confirmed! 🎉' })
        this.viewMyBookingsButton = page.getByRole('button', { name: 'View My Bookings' })
        this.browseMoreEventsButton = page.getByRole('button', { name: 'Browse More Events' })
        this.eventTicketHeader = page.getByRole('heading')
        this.bookingReferenceNumber = page.locator(".booking-ref")
        this.bookingUserName = page.locator("//span[contains(., 'Customer')]/following-sibling::span")
        this.bookingTicketQuantity = page.locator("//span[contains(., 'Tickets')]/following-sibling::span")
        this.totalPrice = page.locator("//span[contains(., 'Total')]/following-sibling::span")
    }

    async getProductCount() {
        return parseInt(await this.ticketCountText.textContent())
    }

    async incrementProductCount() {
        await this.incrementProductCountButton.click()
    }

    async decrementProductCount() {
        await this.decrementProductCountButton.click()
    }

    async confirmBooking(name, email, phone, quantity = 1) {
        if (await this.getProductCount() < quantity) {
            for (let i = 0; i < quantity - await this.getProductCount(); i++) {
                await this.incrementProductCount()
            }
        } else if (await this.getProductCount() > quantity) {
            for (let i = 0; i < await this.getProductCount() - quantity; i++) {
                await this.decrementProductCount()
            }
        }
        await this.nameTextbox.fill(name)
        await this.emailIDTextbox.fill(email)
        await this.phoneTextbox.fill(phone)
        await this.confirmBookingButton.click()
    }

    async getBookingConfirmationDetails() {
        const bookingReferenceNumber = await this.bookingReferenceNumber.textContent()
        const bookingUserName = await this.bookingUserName.textContent()
        const bookingTicketQuantity = await this.bookingTicketQuantity.textContent()
        const totalPrice = await this.totalPrice.textContent()
        return { bookingReferenceNumber, bookingUserName, bookingTicketQuantity, totalPrice }
    }


}