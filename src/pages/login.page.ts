import {Page, Locator, expect} from "@playwright/test"
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator

    constructor(page: Page) {
        super(page)
        this.emailInput = this.page.locator("input#email")
        this.passwordInput = this.page.locator("input#password")
        this.loginButton = this.page.getByRole("button", {name: "Login"})
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email)
        await this.page.waitForTimeout(1000);
        await this.passwordInput.fill(password)
        await this.page.waitForTimeout(1000);
        await this.loginButton.click()
    }

    async verifyLoginSuccess() {
       await expect (this.page).toHaveURL(/admin/)
    }

    async verifyLoginFail() {
       await expect (this.page).toHaveURL(/authentication/)
    }
}