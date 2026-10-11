import {Page, Locator, expect} from '@playwright/test'
import { CustomerData } from '../data/customer/customer.data';
import { BasePage } from './basePage';

export class CustomerPage extends BasePage {
    readonly newCustomerButton: Locator;
    readonly searchInput: Locator;

    readonly companyInput: Locator;
    readonly vatInput: Locator;
    readonly phoneInput: Locator;
    readonly websiteInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly zipInput: Locator;
    readonly countrySelect: Locator;
    readonly saveButton: Locator;

    constructor (page: Page) {
        super(page)

        this.newCustomerButton = this.page.getByRole('link', { name: 'New Customer' });
        this.searchInput = this.page.locator("//div[@id='clients_filter']//input[@placeholder='Search...']")

        this.companyInput = this.page.getByRole('textbox', {name: '* Company'})
        this.vatInput = this.page.getByRole('textbox', { name: 'VAT Number' });
        this.phoneInput = this.page.getByRole('textbox', { name: 'Phone' });
        this.websiteInput = this.page.getByRole('textbox', { name: 'Website' });
        this.addressInput = this.page.getByRole('textbox', { name: 'Address' });
        this.cityInput = this.page.getByRole('textbox', { name: 'City' });
        this.stateInput = this.page.getByRole('textbox', { name: 'State' });
        this.zipInput = this.page.getByRole('textbox', { name: 'Zip Code' });
        this.countrySelect = this.page.getByRole('combobox', { name: 'Country' });
        this.saveButton = this.page.getByRole('button', { name: 'Save', exact: true });
    }

    async fillCustomerForm(customerInfo: CustomerData) {
        await this.fill(this.companyInput, customerInfo.company)
        await this.fill(this.vatInput, customerInfo.vatNumber)
        await this.fill(this.phoneInput, customerInfo.phone)
        await this.fill(this.websiteInput, customerInfo.website)
        await this.fill(this.addressInput, customerInfo.address)
        await this.fill(this.cityInput, customerInfo.city)
        await this.fill(this.stateInput, customerInfo.state)
        await this.fill(this.zipInput, customerInfo.zipCode)
        await this.countrySelect.selectOption({label: customerInfo.country})
    }

    async createCustomer(customerInfo: CustomerData) {
        await this.click(this.newCustomerButton)
        await this.fillCustomerForm(customerInfo)
        await this.click(this.saveButton)
    }

    async verifyCreateCustomerSuccess(successMsg: string) {
        const url = await this.getUrl()
        expect(url).toContain("admin/clients/client/")
        const alert = await this.page.locator("//span[@class='alert-title']").textContent()
        expect(alert).toBe(successMsg)
        console.log(1)
    }

    async verifyRequiredCompanyError(successMsg: string) {
        const url = await this.getUrl()
        expect(url).toContain("admin/clients/client")
        const alert = await this.page.locator("#company-error").textContent()
        expect(alert).toBe(successMsg)
    }

    async searchCustomer (company: string) {
        await this.fill(this.searchInput, company)
    }

    async verifyCustomerInTable(customerData: CustomerData) {
        const customerRow = this.page.locator("#clients").filter({hasText: customerData.company})
        await expect(customerRow).toHaveCount(1)
        await expect(customerRow).toContainText(customerData.phone)
    }

    async verifyCustomerNotInTable(customerData: CustomerData) {
        const customerRow = this.page.locator("#clients").filter({hasText: customerData.company})
        await expect(customerRow).toHaveCount(0)
    }

    async deleteCustomerSuccess(customerData: CustomerData) {
        const customerRow = this.page.locator("#clients").filter({hasText: customerData.company})
        const deleteButton = this.page.locator("//table[@id='clients']//a[@class='text-danger _delete']")

        this.page.once('dialog', async (dialog) => {
            // Verify loại popup
            expect(dialog.type()).toBe('confirm');

            // Verify nội dung popup
            expect(dialog.message()).toBe(
            'Are you sure you want to perform this action?'
            );

            // Click OK
            await dialog.accept();
        });

        await customerRow.hover()
        await expect(deleteButton).toBeVisible()
        await this.click(deleteButton)
        
    }

    async deleteCustomerFail(customerData: CustomerData) {
        const customerRow = this.page.locator("#clients").filter({hasText: customerData.company})
        const deleteButton = this.page.locator("//table[@id='clients']//a[@class='text-danger _delete']")

        this.page.once('dialog', async (dialog) => {
            // Verify loại popup
            expect(dialog.type()).toBe('confirm');

            // Verify nội dung popup
            expect(dialog.message()).toBe(
            'Are you sure you want to perform this action?'
            );

            // Click OK
            await dialog.dismiss();
        });

        await customerRow.hover()
        await expect(deleteButton).toBeVisible()
        await this.click(deleteButton)
        
    }
}