import {test} from "@playwright/test"
import { LoginPage } from "../src/pages/login.page"

test("Login success", async ({page}) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto("https://crm.anhtester.com/admin/authentication")
    await loginPage.login("admin@example.com", "123456")
    await loginPage.verifyLoginSuccess()
})

test("Login fail with empty email", async ({page}) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto("https://crm.anhtester.com/admin/authentication")
    await loginPage.login("", "123456")
    await loginPage.verifyLoginFail()
})

