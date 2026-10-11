import {test} from '@playwright/test'
import { LoginPage } from '../../pages/loginPage'
import { BasePage } from '../../pages/basePage'
import { CustomerPage } from '../../pages/customerPage'
import { buildCustomerData } from '../../data/customer/customer.data'

test.describe('Test edit customer', () => {
    let loginPage: LoginPage
    let basePage : BasePage
    let customerPage: CustomerPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        basePage = new BasePage(page)
        customerPage = new CustomerPage(page)

        await loginPage.goto("https://crm.anhtester.com/admin/authentication")
        await loginPage.login("admin@example.com","123456")
        await loginPage.verifyLoginSuccess()
        await basePage.openCustomerPage()
    })

    test('Test edit customer sucess', async () => { 
        const customerInfor = buildCustomerData()
        const updateInfo = buildCustomerData()
        await customerPage.createCustomer(customerInfor)
        await customerPage.verifyCreateCustomerSuccess("Customer added successfully.")

        await customerPage.editCustomer(updateInfo)
        await customerPage.verifyEditCustomerSuccess(updateInfo, "Customer updated successfully.")

        await customerPage.openCustomerPage()
        await customerPage.searchCustomer(customerInfor)
        await customerPage.verifyCustomerNotInTable(customerInfor)
        await customerPage.searchCustomer(updateInfo)
        await customerPage.verifyCustomerInTable(updateInfo)

    })
})