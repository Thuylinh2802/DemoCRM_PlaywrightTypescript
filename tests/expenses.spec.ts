import {test} from '@playwright/test'
import { CustomerPage } from '../pages/customerPage'
import { ExpensesPage } from '../pages/expensesPage'
import { buildCustomerData } from '../data/customer/customer.data'
import { buildExpenseData, buildImportCsvContent } from '../data/expense/expense.data'
import * as fs from 'fs'
import * as path from 'path'

test.describe('Expenses test', () => {
    let customerPage: CustomerPage
    let expensePage: ExpensesPage

    test.beforeEach(async ({page}) => {
        customerPage = new CustomerPage(page)
        expensePage = new ExpensesPage(page)
        await page.goto('https://crm.anhtester.com/admin/')
    })

    test.skip('Test create new expense success', async () => {
        const customerData = buildCustomerData()
        const expenseData = buildExpenseData()
        await customerPage.openCustomerPage()
        await customerPage.createCustomer(customerData)
        console.log(customerData.company)
        await customerPage.verifyCreateCustomerSuccess("Customer added successfully.")

        await expensePage.openExpensesPage()
        await expensePage.createNewExpense(customerData)
        await expensePage.verifyCreateExpenseSuccess(expenseData, "Expense added successfully.")
    })

    test.skip('Create expense with receipt upload', async () => {
        const customerData = buildCustomerData()
        const expenseData = buildExpenseData()
        await customerPage.openCustomerPage()
        await customerPage.createCustomer(customerData)
        console.log(customerData.company)
        await customerPage.verifyCreateCustomerSuccess("Customer added successfully.")

        await expensePage.openExpensesPage()
        await expensePage.createNewExpense(customerData, "data/expense/receipt.png")
        await expensePage.verifyCreateExpenseWithReceiptSuccess(expenseData)
    })

    test('Test import 1 expense from CSV file', async () => {
        const expenseInfo = buildExpenseData()
        const csvContent = buildImportCsvContent([expenseInfo])
        const csvPath = path.join(__dirname, '..', 'data', 'expense', 'import-expenses.csv')
        fs.writeFileSync(csvPath, csvContent)
        await expensePage.openExpensesPage()
        await expensePage.importExpenseFromCsv(csvPath, [expenseInfo.name])
        await expensePage.verifyImportedExpense([expenseInfo])
    })

    test.skip('Test import multi expense from CSV file', async () => {
        const expenseInfos = Array.from({length: 3}, () => buildExpenseData())
        const csvContent = buildImportCsvContent(expenseInfos)
        const csvPath = path.join(__dirname, '..', 'data', 'expense', 'import-expenses.csv')
        fs.writeFileSync(csvPath, csvContent)
        await expensePage.openExpensesPage()
        await expensePage.importExpenseFromCsv(csvPath, expenseInfos.map(e => e.name))
        await expensePage.verifyImportedExpense(expenseInfos)
    })
})