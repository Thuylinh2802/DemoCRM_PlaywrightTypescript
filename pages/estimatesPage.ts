import{Page, Locator, expect} from '@playwright/test'
import { BasePage } from './basePage';
import { EstimateItemData } from '../data/estimates.data';
import { buildCustomerData, CustomerData } from '../data/customer/customer.data';

export class EstimatesPage extends BasePage {
    readonly createEstimatesButton: Locator
    readonly descriptionItem: Locator
    readonly quantityItem: Locator
    readonly rateItem: Locator
    readonly addItemButton: Locator
    readonly saveButton: Locator

    constructor(page: Page) {
        super(page)

        this.createEstimatesButton = this.page.getByRole('link', {name:'Create New Estimate'})

        this.descriptionItem = this.page.getByPlaceholder("Description", { exact: true })
        this.quantityItem = this.page.getByPlaceholder("Quantity")
        this.rateItem = this.page.getByPlaceholder("Rate")
        this.addItemButton = this.page.locator('button[onclick*="add_item_to_table"]')
        
        this.saveButton = this.page.getByRole('button', {name: 'Save'})

    }

    async addItem(estimateItemData: EstimateItemData) {
       await this.descriptionItem.fill(estimateItemData.description)
       await this.quantityItem.fill(estimateItemData.quantity)
       await this.rateItem.fill(estimateItemData.rate)
       await this.addItemButton.click()
    }

    async createEstimate(customerName: string, estimateItemData: EstimateItemData) {
        await this.createEstimatesButton.click()
        await this.selectCustomer(customerName)
        await this.addItem(estimateItemData)
        await this.saveButton.click()
    }

    async verifyCreateEstimateSuccess(successMsg: string) {
        const alert = this.page.locator("//span[@class='alert-title']")
        await expect(alert).toBeVisible()
        await expect(alert).toHaveText(successMsg)
        expect(await this.getUrl()).toContain("admin/estimates/list_estimates/")
    }
}