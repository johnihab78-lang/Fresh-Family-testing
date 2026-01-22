import { Page, Locator } from '@playwright/test';

export class SalesDashboard {
    readonly page: Page;
    readonly titlePage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titlePage = page.getByRole('heading', { name: "Sales Orbit" });
    }

    async waitForLoad() {
        await this.page.waitForURL(/sales-dashboard\/visit-planning/, { timeout: 10000 });
        await this.page.waitForLoadState('networkidle');
    }
}