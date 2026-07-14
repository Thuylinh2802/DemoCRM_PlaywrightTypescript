import {test} from "@playwright/test"
import { LoginPage } from "../src/pages/login.page"
import { loginData } from "../src/data/login.data"


test.describe("Login Test", () => {
    loginData.forEach(({name, email, password, expected}) => {
        test(name, async ({page}) => {
            const loginPage = new LoginPage(page)

            await loginPage.goto("/admin/authentication")
            await loginPage.login(email, password)

            if(expected === "success") {
                await loginPage.verifyLoginSuccess()
            } else {
                await loginPage.verifyLoginFail()
            }
        })
    })

})

