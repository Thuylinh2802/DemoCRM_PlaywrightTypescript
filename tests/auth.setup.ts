import { test } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'

// Test này chạy TRƯỚC toàn bộ các test khác (cấu hình ở bước 2).
// Nhiệm vụ duy nhất: login 1 lần rồi lưu session (cookie + localStorage) ra file auth.json
test('Login và lưu session', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await page.goto('https://crm.anhtester.com/admin/authentication')
    await loginPage.login('admin@example.com', '123456')
    await loginPage.verifyLoginSuccess()

    // Xuất toàn bộ session của context này ra file auth.json
    await page.context().storageState({ path: 'auth.json' })
})