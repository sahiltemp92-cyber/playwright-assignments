import { test, expect } from "playwright/test"


test("@Assignment1 - Assignment - 1 - Part 1 - Verify that login page loads properly", async ({ page }) => {
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

test("@Assignment1 Assignment - 1 - Part 2 - Verify that login page loads properly", async ({ page }) => {
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

    // Asserts
    await expect(emailInput).toHaveValue('')
    await expect(page.url()).toContain("login")

})
