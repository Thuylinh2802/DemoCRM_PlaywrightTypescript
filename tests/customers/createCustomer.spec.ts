import {test, expect} from '@playwright/test';
import { BasePage } from '../../pages/basePage';
import { CustomerPage } from '../../pages/customerPage';
import { buildCustomerData } from '../../data/customer/customer.data';
import { LoginPage } from '../../pages/loginPage';

test.describe('Test create customer', () => {
    let loginPage: LoginPage;
    let basePage: BasePage;
    let customerPage: CustomerPage;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)
        basePage = new BasePage(page)
        customerPage = new CustomerPage(page)
        await loginPage.goto("https://crm.anhtester.com/admin/authentication")
        await loginPage.login("admin@example.com","123456")
        await loginPage.verifyLoginSuccess()
        await basePage.openCustomerPage()
    })

    test('Test create new customer success', async () => {
        const customerInfor = buildCustomerData()
        await customerPage.createCustomer(customerInfor)
        await customerPage.verifyCreateCustomerSuccess("Customer added successfully.")

        await customerPage.openCustomerPage()
        await customerPage.searchCustomer(customerInfor.company)
        await customerPage.verifyCustomerInTable(customerInfor)
    })

    test('Test create new customer fail with empty company', async () => {
        const customerInfor = buildCustomerData({company: ""})
        await customerPage.createCustomer(customerInfor)
        await customerPage.verifyRequiredCompanyError("This field is required.")
    })
})