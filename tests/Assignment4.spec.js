import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/loginPage"
import { LandingPage } from "../pages/landingPage"
import { EventsListPage } from "../pages/eventsListPage"
import { EventDetailsPage } from "../pages/eventDetailsPage"
import { MyBookingsListPage } from "../pages/bookingsListPage"
import { BookingDetailsPage } from "../pages/bookingDetailPage"

test("@Assignment4 - Assignment 4 - Multi Booking History and Detail Reconciliation", async ({ page }) => {
    // Objects
    const loginPage = new LoginPage(page)
    const landingPage = new LandingPage(page)
    const eventsListPage = new EventsListPage(page)
    const eventsDetailPage = new EventDetailsPage(page)
    const myBookingListPage = new MyBookingsListPage(page)
    const bookingDetailsPage = new BookingDetailsPage(page)
    // Constants
    const EMAIL_ADDRESS = "sahil.khenat.career@gmail.com"
    const PASSWORD = "Rahul@12345"

    // Actions
    await page.goto("")
    await loginPage.signIn(EMAIL_ADDRESS, PASSWORD)

    // Book first event
    await landingPage.goToEventsList()
    const searchWorldText1 = "World"
    const searchCategory1 = "Conference"
    const searchCity1 = "Hyderabad"

    await eventsListPage.bookFirstMatchingEvent(searchWorldText1, searchCategory1, searchCity1)

    const firstBookingDetails = {
        name: "First User",
        email: "firstuser@email.com",
        phone: "1234567890",
        quantity: 1
    }
    await eventsDetailPage.confirmBooking(firstBookingDetails.name, firstBookingDetails.email, firstBookingDetails.phone, firstBookingDetails.quantity)
    expect(await eventsDetailPage.bookingConfirmationHeader.textContent()).toContain("Booking Confirmed")

    // Get booking confirmation details
    const firstBookingConfirmationDetails = await eventsDetailPage.getBookingConfirmationDetails()
    console.log("First booking confirmation details:", firstBookingConfirmationDetails)


    await eventsDetailPage.viewMyBookingsButton.click()
    await myBookingListPage.viewBookingDetails(firstBookingConfirmationDetails.bookingRefNumber)

    // Get booking details from booking details page
    const firstBookingActualDetails = await bookingDetailsPage.getBookingDetails()
    console.log("First booking details:", firstBookingActualDetails)
    expect(firstBookingActualDetails.bookingEventTitle).toBe("World Tech Summit")
    expect(firstBookingActualDetails.bookingRefNumber).not.toBe("")
    expect(firstBookingActualDetails.bookingTicketQuantity).toBe("1")

    // Go to events catalog
    await page.goto("/events")

    // Book second event

}
)