import {Page, Locator} from '@playwright/test'

export class BasePage {
    readonly page: Page;
    readonly customerMenu: Locator;
    readonly estimatesMenu: Locator;

    constructor(page: Page) {
        this.page = page
        this.customerMenu = this.page.getByRole('link', {name: 'Customers'})
        this.estimatesMenu = this.page.getByRole('link', {name: 'Estimates'})
    }

    async click(locator: Locator) {
        await locator.click()
    }

    async fill(locator: Locator, text: string) {
        await locator.fill(text)
    }

    async getUrl() {
        return this.page.url()
    }

    async openCustomerPage() {
        await this.customerMenu.click()
    }

    async openEstimatesPage() {
        await this.estimatesMenu.click()
    }

    async goto(url: string) {
        await this.page.goto(url)
    }

}