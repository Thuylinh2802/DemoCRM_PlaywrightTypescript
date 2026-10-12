import {test} from '@playwright/test'
import { LoginPage } from '../../pages/loginPage'
import { BasePage } from '../../pages/basePage'
import { CustomerPage } from '../../pages/customerPage'
import { buildCustomerData } from '../../data/customer/customer.data'

test.describe('Test edit customer', () => {
    let customerPage: CustomerPage

    test.beforeEach(async ({page}) => {
        customerPage = new CustomerPage(page)
        await page.goto('https://crm.anhtester.com/admin/')
        await customerPage.openCustomerPage()
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