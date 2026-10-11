import {test} from "@playwright/test"
import { LoginPage } from "../../pages/loginPage"
import { BasePage } from "../../pages/basePage"
import { CustomerPage } from "../../pages/customerPage"
import { buildCustomerData } from "../../data/customer/customer.data"

test.describe(("Test delete customer"), () => {
    let loginPage: LoginPage
    let basePage: BasePage
    let customerPage: CustomerPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        basePage = new BasePage(page)
        customerPage = new CustomerPage(page)
        await loginPage.goto("https://crm.anhtester.com/admin/authentication")
        await loginPage.login("admin@example.com","123456")
        await basePage.openCustomerPage()
    })

    test('Test delete customer success', async () => {
        const customerData = buildCustomerData()
        await customerPage.createCustomer(customerData)
        await customerPage.verifyCreateCustomerSuccess("Customer added successfully.")

        await customerPage.openCustomerPage()
        await customerPage.searchCustomer(customerData.company)
        await customerPage.verifyCustomerInTable(customerData)

        await customerPage.deleteCustomerSuccess(customerData)
        await customerPage.searchCustomer(customerData.company)
        await customerPage.verifyCustomerNotInTable(customerData)
    })

    test('Test delete customer fail', async () => {
        const customerData = buildCustomerData()
        await customerPage.createCustomer(customerData)
        await customerPage.verifyCreateCustomerSuccess("Customer added successfully.")

        await customerPage.openCustomerPage()
        await customerPage.searchCustomer(customerData.company)
        await customerPage.verifyCustomerInTable(customerData)

        await customerPage.deleteCustomerFail(customerData)
        await customerPage.searchCustomer(customerData.company)
        await customerPage.verifyCustomerInTable(customerData)
    })
})