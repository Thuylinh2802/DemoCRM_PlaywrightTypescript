import {faker} from '@faker-js/faker'

export interface ExpenseData {
    name: string;
    note: string;
    category: string;
    amount: string;
    customerName: string;
    }

export function buildExpenseData(overrides: Partial<ExpenseData> = {}): ExpenseData {
  return {
    name: `AT Expense ${faker.person.lastName()} ${faker.number.int({ min: 1000, max: 9999 })}`,
    note: `Chi phí test tu dong ${faker.lorem.words(3)}`,
    category: 'Category01',
    amount: faker.number.int({ min: 10, max: 999 }).toString(),
    customerName: '',
    ...overrides,
  }
}

export function buildImportCsvContent(expenseInfos: ExpenseData[]): string {
  const now = new Date()
  const today = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`
  const header = '"Category","Amount","Tax","Tax2","Reference no","Note","Expense name","Customer","Billable","Payment Mode","Date",'
  // Mỗi expense 1 dòng CSV (giữ dấu phẩy cuối dòng như file mẫu)
  const rows = expenseInfos.map(expenseInfo =>
    `"${expenseInfo.category}","${expenseInfo.amount}","","","AT-IMPORT","${expenseInfo.note}","${expenseInfo.name}","","no","Bank","${today}",`
  )
  return `${header}\n${rows.join('\n')}\n`
}
