import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './basePage';
import { buildExpenseData, ExpenseData } from '../data/expense/expense.data.ts';
import { CustomerData } from '../data/customer/customer.data.ts';

export class ExpensesPage extends BasePage {
    // Nút trên trang danh sách Expenses
    readonly recordExpenseButton: Locator
    readonly importExpenseButton: Locator
    readonly searchInput: Locator;

    // Các trường trong form Add new Expense
    readonly attachReceiptInput: Locator
    readonly receiptDropzone: Locator
    readonly nameInput: Locator
    readonly noteInput: Locator
    readonly expenseCategorySelect: Locator
    readonly expenseDate: Locator
    readonly amoutInput: Locator
    readonly customerSelect: Locator
    readonly saveButton: Locator 

    readonly importFileInput: Locator
    readonly simulateImportButton: Locator; // nút "Simulate Import" (chạy thử, KHÔNG ghi thật)
    readonly importButton: Locator;

    constructor(page: Page) {
        super(page) 

        this.recordExpenseButton = this.page.getByRole('link', {name: 'Record Expense'})
        this.importExpenseButton = this.page.getByRole('link', {name: 'Import Expenses'})
        this.searchInput = this.page.locator('#expenses_filter input[type="search"]')

        this.attachReceiptInput = this.page.locator('input.dz-hidden-input')
        this.receiptDropzone = this.page.locator('.dropzone')
        this.nameInput = this.page.locator('#expense_name')
        this.noteInput = this.page.locator('#note')
        this.expenseCategorySelect = this.page.locator('#category')
        this.expenseDate = this.page.locator('#date')
        this.amoutInput = this.page.locator('#amount')
        this.customerSelect = this.page.locator('button[data-id="clientid"]')
        this.saveButton = this.page.getByRole('button', {name: 'Save'})

        this.importFileInput = this.page.locator('input[id="file_csv"]')
        this.simulateImportButton = this.page.getByRole('button', {name: 'Simulate Import'})
        this.importButton = this.page.getByRole('button', {name: 'Import', exact: true})
    }

    async uploadReceipt(filePath: string) {
        await this.attachReceiptInput.setInputFiles(filePath)
        // Verify dropzone đã nhận file (hiển thị tên file trong preview)
        await expect(this.receiptDropzone).toContainText('receipt.png')
    }

    async fillExpenseForm(expenseInfo: ExpenseData) {
        await this.fill(this.nameInput, expenseInfo.name)
        await this.fill(this.noteInput, expenseInfo.note)
        await this.expenseCategorySelect.selectOption({ label: expenseInfo.category })
        await this.fill(this.amoutInput, expenseInfo.amount)
    }

    async createNewExpense(customerData: CustomerData, receiptFilePath?: string) {
        const expenseData = buildExpenseData()
        await this.recordExpenseButton.click()
        if (receiptFilePath) {
            await this.uploadReceipt(receiptFilePath)
        }
        await this.fillExpenseForm(expenseData)
        await this.selectCustomer(customerData.company)
        await this.saveButton.click()
    }

    // Tìm kiếm expense trong bảng danh sách theo tên
    async searchExpense(name: string) {
        await this.fill(this.searchInput, name)
    }

    async verifyCreateExpenseSuccess(expenseData: ExpenseData, successMsg: string) {
        const url = await this.getUrl()
        expect(url).toContain("admin/expenses/")
        const alert = await this.page.locator("//span[@class='alert-title']").textContent()
        expect(alert).toBe(successMsg)
    }

    async verifyCreateExpenseWithReceiptSuccess(expenseData: ExpenseData) {
        const url = await this.getUrl()
        expect(url).toContain("admin/expenses/")
    }

    async importExpenseFromCsv(csvFilePath: string, expectedExpenseNames: string[]) {
        await this.click(this.importExpenseButton)
        await this.importFileInput.setInputFiles(csvFilePath)
        //Simulate import
        await this.click(this.simulateImportButton)
        await this.page.waitForLoadState('load')
        // (lọc theo tên expense ĐẦU TIÊN vì trang có sẵn 1 bảng mẫu tĩnh khác
        // cùng cấu trúc - faker sinh tên duy nhất mỗi lần chạy nên không nhầm bảng)
        const simulationTable = this.page.locator('table.table-bordered').filter({
            hasText: expectedExpenseNames[0],
        })
        await expect(simulationTable).toBeVisible()
        // Mọi dòng CSV (dù 1 hay nhiều) đều phải hiển thị đủ trong bảng simulate
        for (const expenseName of expectedExpenseNames) {
            await expect(simulationTable).toContainText(expenseName)
        }
        await expect(simulationTable).toBeVisible()
        //Upload lại file import thật
        await this.importFileInput.setInputFiles(csvFilePath)
        await this.click(this.importButton)
    }

    async verifyImportedExpense(expenseInfos: ExpenseData[]) {
        const alert = this.page.locator('#alert_float_1')
        await expect(alert).toContainText('Total Imported')
        await this.openExpensesPage()
        await this.page.waitForLoadState('load')
        for(const expenseInfo of expenseInfos) {
            await this.searchExpense(expenseInfo.name)
            const expenseRow = this.page.locator('#expenses tbody tr')
            await expect(expenseRow).toContainText(expenseInfo.name)
            await expect(expenseRow).toContainText(`$${Number(expenseInfo.amount).toFixed(2)}`)
        }
    }

}