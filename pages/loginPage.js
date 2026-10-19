export class LoginPage {
    constructor(page) {
        this.page = page
        this.baseURL = "https://eventhub.rahulshettyacademy.com/"
        this.signinHeader = page.getByText('Sign in to EventHub', { exact: true })
        this.signinButton = page.getByRole('button', { name: 'Sign In' })
        this.emailInput = page.getByPlaceholder('you@email.com')
        this.passwordInput = page.locator('#password')
    }

    async gotoLoginPage() {
        await this.page.goto(`${this.baseURL}login`)
    }

    async fillEmail(email) {
        await this.emailInput.fill(email)
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password)
    }

    async clickSignin() {
        await this.signinButton.click()
    }

    async signIn(email, password) {
        await this.fillEmail(email)
        await this.fillPassword(password)
        await this.clickSignin()
    }
}
