import {test, expect} from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { CustomerPage } from '../../pages/customerPage';
import { buildCustomerData } from '../../data/customer/customer.data';
import { LoginPage } from '../../pages/loginPage';

test.describe('Test create customer', () => {
    let customerPage: CustomerPage;

    test.beforeEach(async({page}) => {
        customerPage = new CustomerPage(page)
        await page.goto('https://crm.anhtester.com/admin/')
        await customerPage.openCustomerPage()
    })

    test('Test create new customer success', async () => {
        const customerInfor = buildCustomerData()
        await customerPage.createCustomer(customerInfor)
        await customerPage.verifyCreateCustomerSuccess("Customer added successfully.")

        await customerPage.openCustomerPage()
        await customerPage.searchCustomer(customerInfor)
        await customerPage.verifyCustomerInTable(customerInfor)
    })

    test('Test create new customer fail with empty company', async () => {
        const customerInfor = buildCustomerData({company: ""})
        await customerPage.createCustomer(customerInfor)
        await customerPage.verifyRequiredCompanyError("This field is required.")
    })
})