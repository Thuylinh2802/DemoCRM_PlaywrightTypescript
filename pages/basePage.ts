import {Page, Locator, expect} from '@playwright/test'

export class BasePage {
    readonly page: Page;
    readonly customerMenu: Locator;
    readonly estimatesMenu: Locator;
    readonly expensesMenu: Locator;

    readonly customerSelect: Locator
    readonly customerSearchInput: Locator
    readonly customerDropList: Locator

    constructor(page: Page) {
        this.page = page
        this.customerMenu = this.page.getByRole('link', {name: 'Customers'})
        this.estimatesMenu = this.page.getByRole('link', {name: 'Estimates'})
        this.expensesMenu = this.page.getByRole('link', {name: 'Expenses'})

        this.customerSelect = this.page.locator('button[data-id="clientid"]')
        this.customerSearchInput = this.page.getByRole('combobox', {name: 'Search'})
        this.customerDropList = this.page.locator('li')
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

    async openExpensesPage() {
        await this.expensesMenu.click()
    }

    async goto(url: string) {
        await this.page.goto(url)
    }

    async selectCustomer(customerName: string) {
        await this.customerSelect.click()
        await this.customerSearchInput.pressSequentially(customerName)
        await expect(this.customerDropList.filter({hasText: customerName})).toBeVisible()
        await this.customerDropList.filter({hasText: customerName}).click()
    }

}