export class LandingPage {
    constructor(page) {
        this.page = page
        this.browseEventsButton = page.getByText('Browse Events →', { exact: true })
    }

    async clickBrowseEvents() {
        await this.browseEventsButton.click()
    }
}
