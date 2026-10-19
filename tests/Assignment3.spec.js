import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/loginPage"
import { LandingPage } from "../pages/landingPage"
import { EventsListPage } from "../pages/eventsListPage"

test("@Assignment3 - Assignment - 3 - Events List Locators and Text Assertions", async ({ page }) => {
    // Objects
    const loginPage = new LoginPage(page)
    const landingPage = new LandingPage(page)
    const eventsListPage = new EventsListPage(page)

    const EMAIL_ADDRESS = "sahil.khenat.career@gmail.com"
    const PASSWORD = "Rahul@12345"

    // Actions
    await loginPage.gotoLoginPage()

    // Sign in
    await loginPage.fillEmail(EMAIL_ADDRESS)
    await loginPage.fillPassword(PASSWORD)
    await loginPage.clickSignin()

    // Browse Events
    await landingPage.goToEventsList()

    // Verify Upcoming events header is displayed
    await eventsListPage.verifyUpcomingEventsHeader()

    // Assertions
    expect(await page.title()).toContain("EventHub — Discover & Book Events")

    // Apply filters
    const searchText = "World"
    const searchCategory = "Conference"
    const searchCity = "Hyderabad"

    // Actions - Filtering
    await eventsListPage.searchEvents(searchText)
    await eventsListPage.selectCategory(searchCategory)
    await eventsListPage.selectCity(searchCity)

    const searchResults = page.locator("#event-card")
    console.log("Number of events found: " + await searchResults.count())
    const count = await searchResults.count()
    let countOfexactMatch = 0;
    for (let i = 0; i < count; i++) {
        // Get event title
        const eventName = (await searchResults.nth(i).locator("h3").textContent())?.trim()
        // Check if event title is exactly "World Tech Summit"
        if (eventName === "World Tech Summit") {
            countOfexactMatch = countOfexactMatch + 1
            console.log("Event Title: " + eventName)
            // Get event price
            const eventPrice = (await searchResults.nth(i).locator("p").textContent())?.trim()
            console.log("Event Price: " + eventPrice)
            expect(eventPrice).toContain("$")

            // Get event seats available
            const eventSeatsLeft = (await searchResults.nth(i).locator("span").last().textContent())?.trim()
            console.log("Event Seats Left: " + eventSeatsLeft)
            const seatsAvailableNumber = eventSeatsLeft.match(/(\d+)/)[0];
            console.log("Seats Available: " + seatsAvailableNumber)
            expect(parseInt(+seatsAvailableNumber)).toBeGreaterThan(0)

            // Click on the "Book Now" button
            const bookNowButton = searchResults.nth(i).locator("#book-now-btn")
            await bookNowButton.click()
            await page.waitForURL("**/events/**")

            // Asserts on booking detail page
            // URL to contain 'events'
            expect(await page.url()).toContain("events")
            // Event header is visible and same as event name
            const eventHeader = page.getByRole('heading', { name: 'World Tech Summit' })
            expect(eventHeader).toBeVisible()
            expect(await eventHeader.textContent()).toEqual(eventName)

            // Get event price and assert with list price
            const eventPriceOnDetailsPage = (await page.locator("//p[normalize-space()='Price per ticket']/following-sibling::p").textContent())?.trim()
            expect(eventPriceOnDetailsPage).toEqual(eventPrice)
            break
        }

    }
    expect(countOfexactMatch).toBe(1)

    await page.goto("/events")
    const eventCountWithoutFilter = page.locator("#event-card");
    const countWithoutFilterCount = await eventCountWithoutFilter.count()
    console.log("Number of events found without filter: " + countWithoutFilterCount)
    expect(countWithoutFilterCount).toBeGreaterThan(3);

    for (let i = 0; i < countWithoutFilterCount; i++) {
        const cardTitle1 = await eventCountWithoutFilter.nth(0).locator("h3").textContent();
        const cardTitle2 = await eventCountWithoutFilter.nth(1).locator("h3").textContent();
        const cardTitleLast = await eventCountWithoutFilter.last().locator("h3").textContent();
        console.log("Card Title First: " + cardTitle1)
        console.log("Card Title Second: " + cardTitle2)
        console.log("Card Title Last: " + cardTitleLast)

        // Expect all to be non empty
        expect(cardTitle1).not.toEqual("")
        expect(cardTitle2).not.toEqual("")
        expect(cardTitleLast).not.toEqual("")

        // Expect first and last are not equal
        expect(cardTitle1).not.toEqual(cardTitleLast)

    }

})