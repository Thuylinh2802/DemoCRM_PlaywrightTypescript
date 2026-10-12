import {test} from '@playwright/test'
import { EstimatesPage } from '../pages/estimatesPage'
import { buildCustomerData } from '../data/customer/customer.data'
import { CustomerPage } from '../pages/customerPage'
import { buildEstimateItemData } from '../data/estimates.data'

test.describe('Login test', () => {
    let customerPage: CustomerPage
    let estimatePage: EstimatesPage

    test.beforeEach(async ({page}) => {
        customerPage = new CustomerPage(page)
        estimatePage = new EstimatesPage(page)
        await page.goto('https://crm.anhtester.com/admin/')
    })

    test('Test create new estimate success', async ({page}) => {
        const customerData = buildCustomerData()
        const estimateItemData = buildEstimateItemData()
        await customerPage.openCustomerPage()
        await customerPage.createCustomer(customerData)
        console.log(customerData.company)
        await customerPage.verifyCreateCustomerSuccess("Customer added successfully.")

        await estimatePage.openEstimatesPage()
        await estimatePage.createEstimate(customerData.company, estimateItemData)
        await estimatePage.verifyCreateEstimateSuccess("Estimate added successfully.")
    })

})