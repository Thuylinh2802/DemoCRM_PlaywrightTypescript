import{Page, Locator, test, expect} from '@playwright/test'
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator

    constructor(page: Page) {
        super(page)

        this.emailInput = this.page.getByRole('textbox', {name: 'Email Address'})
        this.passwordInput = this.page.getByRole('textbox', {name: 'Password'})
        this.loginButton = this.page.getByRole('button', {name: 'Login'})
    }

    async login(email: string, password: string) {
        await this.fill(this.emailInput, email)
        await this.fill(this.passwordInput, password)
        await this.click(this.loginButton)
    }

    async verifyLoginSuccess() {
        const url = await this.getUrl()
        expect(url).toContain('/admin/')
    }

    async verifyLoginFail(errorMsg: string) {
        const url = await this.getUrl()
        expect(url).toContain('/authentication')
        const alert = this.page.getByText(errorMsg)
        await expect(alert).toBeVisible()
    }
}