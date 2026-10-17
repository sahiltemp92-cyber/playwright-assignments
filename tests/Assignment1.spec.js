import { test, expect } from "playwright/test"

test("Assignment - 1 - Login Part 1 - Verify that login page loads properly", async ({ page }) => {
    // Locators or variables
    const baseURL = "https://eventhub.rahulshettyacademy.com/"
    const signinHeader = page.getByText('Sign in to EventHub', { exact: true })
    const emailInput = page.getByPlaceholder('you@email.com')
    const signinButton = page.getByRole('button', { name: 'Sign In' })

    // Actions
    await page.goto(`${baseURL}\login`)

    // Assertions
    await expect(signinHeader).toBeVisible()
    await expect(emailInput).toBeVisible()
    await expect(signinButton).toBeVisible()

})

test("Assignment - 1 - Login Part 2 - Verify that login page loads properly", async ({ page }) => {
    // Locators or variables
    const baseURL = "https://eventhub.rahulshettyacademy.com/"
    const passwordTextbox = page.locator('#password')

    // Actions
    await page.goto(`${baseURL}\login`)

    // Asserts
    await expect(passwordTextbox).toBeVisible()
    await expect(page.url()).toContain("login")

})