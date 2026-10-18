import { test, expect } from "playwright/test"


test("@Assignment2 Assignment - 2 - Browser Context Page Fixture and Config", async ({ page, browser }) => {
    // PART 1
    // Open the login page using the built-in page fixture (baseURL from playwright.config.js is auto-prepended)
    await page.goto('/login')

    // Locators
    const signinHeader = page.getByText('Sign in to EventHub', { exact: true })
    const signinButton = page.getByRole('button', { name: 'Sign In' })
    const emailInput = page.getByPlaceholder('you@email.com')

    // Assertions
    console.log(await page.title())
    expect(await page.title()).toContain("EventHub — Discover & Book Events")
    await expect(emailInput).toBeVisible()
    await expect(signinHeader).toBeVisible()
    await expect(signinButton).toBeVisible()

    // Fill the email field with the sample value
    await emailInput.fill('beginner@sample.com')

    // Confirm the same field still shows that value
    await expect(emailInput).toHaveValue('beginner@sample.com')

    // PART 2 - Context Handling
    const browser_context = await browser.newContext() // create new context
    const newPage = await browser_context.newPage() // create new page

    // Navigate to the same URL with the new browser context
    await newPage.goto('/login')
    const newpage_signInHeading = newPage.getByRole('heading', { name: 'Sign in to EventHub' })
    const newpage_emailInput = newPage.getByPlaceholder('you@email.com')
    await expect(newpage_signInHeading).toBeVisible()
    await expect(newpage_emailInput).toBeVisible()
    await expect(newpage_emailInput).toHaveValue('')

})
