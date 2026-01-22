import { Page, Locator } from '@playwright/test';

export class HRDashboard {
    readonly page: Page;
    readonly titlePage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titlePage = page.getByRole('heading', { name: "HR" });
    }

    async waitForLoad() {
        await this.page.waitForURL(/hr-dashboard\/overview/, { timeout: 10000 });
        await this.page.waitForLoadState('networkidle');
    }
}