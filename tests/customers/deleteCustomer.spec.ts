import {test} from "@playwright/test"
import { LoginPage } from "../../pages/loginPage"
import { BasePage } from "../../pages/basePage"
import { CustomerPage } from "../../pages/customerPage"
import { buildCustomerData } from "../../data/customer/customer.data"

test.describe(("Test delete customer"), () => {
    let customerPage: CustomerPage;

    test.beforeEach(async({page}) => {
        customerPage = new CustomerPage(page)
        await page.goto('https://crm.anhtester.com/admin/')
        await customerPage.openCustomerPage()
    })

    test('Test delete customer success', async () => {
        const customerData = buildCustomerData()
        await customerPage.createCustomer(customerData)
        await customerPage.verifyCreateCustomerSuccess("Customer added successfully.")

        await customerPage.openCustomerPage()
        await customerPage.searchCustomer(customerData)
        await customerPage.verifyCustomerInTable(customerData)

        await customerPage.deleteCustomerSuccess(customerData)
        await customerPage.searchCustomer(customerData)
        await customerPage.verifyCustomerNotInTable(customerData)
    })

    test('Test delete customer fail', async () => {
        const customerData = buildCustomerData()
        await customerPage.createCustomer(customerData)
        await customerPage.verifyCreateCustomerSuccess("Customer added successfully.")

        await customerPage.openCustomerPage()
        await customerPage.searchCustomer(customerData)
        await customerPage.verifyCustomerInTable(customerData)

        await customerPage.deleteCustomerFail(customerData)
        await customerPage.searchCustomer(customerData)
        await customerPage.verifyCustomerInTable(customerData)
    })
})