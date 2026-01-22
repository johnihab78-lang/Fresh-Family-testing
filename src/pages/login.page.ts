import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly employeeCode: Locator;
    readonly verificationCode: Locator;
    readonly continue: Locator;
    readonly verify: Locator;

    constructor(page: Page) {
        this.page = page;
        this.employeeCode = page.locator("input[name='employeeCode']");
        this.verificationCode = page.locator('input[data-input-otp="true"]')
        this.continue = page.getByRole('button', { name: 'Continue' });
        this.verify = page.getByRole('button', { name: 'Verify' });

    }

    async goto() {
        const baseUrl = process.env.BASE_URL;
        await this.page.goto(`${baseUrl}login`)
    }

    async enterEmployeeCode(code: string) {
        await this.employeeCode.click();
        await this.employeeCode.fill(code);
        try {
            await this.continue.waitFor({ state: 'visible', timeout: 10000 });
            await this.continue.click();
        } catch (e) {
            // fallback strategies if Continue isn't visible/clickable
            try {
                await this.employeeCode.press('Enter');
            } catch {}
            try {
                await this.continue.click({ timeout: 5000 });
            } catch {}
            try {
                const btn = this.page.locator('button:has-text("Continue")');
                if (await btn.count() > 0) await btn.first().click();
            } catch {}
        }

        // wait for the verification input to appear
        await this.verificationCode.waitFor({ state: 'visible', timeout: 15000 });
    }

    async enterVerificationNums(code: string) {
        // focus & type OTP
        await this.verificationCode.click();
        await this.verificationCode.type(code, { delay: 100 });

        // click verify button if visible
        if (await this.verify.isVisible()) {
            await this.verify.click();
        }
    }

}
