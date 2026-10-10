import {Page, Locator} from '@playwright/test'
import { CustomerData } from '../data/customer/customer.data';
import { BasePage } from './basePage';

export class CustomerPage extends BasePage {
    readonly newCustomerButton: Locator;

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

    async verifyCreateCustomerSuccess() {}
}