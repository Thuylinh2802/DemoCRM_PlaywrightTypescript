import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/loginPage'

test.describe('Login test', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await page.goto("https://crm.anhtester.com/admin/authentication")
    })

    test('Test login success', async ({page}) => {
        await loginPage.login("admin@example.com", "123456")
        await loginPage.verifyLoginSuccess()
    })

    test('Login with empty email', async () => {
    await loginPage.login("", "123456")
    await loginPage.verifyLoginFail("The Email Address field is required.")
  })

  test('Login with empty password', async () => {
    await loginPage.login("admin@example.com", "")
    await loginPage.verifyLoginFail("The Password field is required.")
  })

  test('Login with invalid email or password', async () => {
    await loginPage.login("admin@example.com", "123")
    await loginPage.verifyLoginFail("Invalid email or password")
  })
})