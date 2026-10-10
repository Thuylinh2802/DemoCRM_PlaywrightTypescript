import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/loginPage';
import { BasePage } from '../pages/basePage';
import { CustomerPage } from '../pages/customerPage';
import { buildCustomerData } from '../data/customer/customer.data';

test.describe('Customer test', () => {
    let loginPage: LoginPage;
    let basePage: BasePage;
    let customerPage: CustomerPage;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)
        basePage = new BasePage(page)
        customerPage = new CustomerPage(page)
        await page.goto("https://crm.anhtester.com/admin/authentication")
        await loginPage.login("admin@example.com","123456")
        await loginPage.verifyLoginSuccess()
        await basePage.openCustomerPage()
    })

    test('Test create new customer success', async ({page}) => {
        const customerInfor = buildCustomerData()
        await customerPage.createCustomer(customerInfor)
    })
})