import { Page, Locator } from '@playwright/test';

export class AdminLayoutPage {
    readonly page: Page;
    readonly drawerItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.drawerItems = page.locator('div[data-slot="card"]');
    }

    async openDashboard(name: string) {
        const item = this.drawerItems.filter({ hasText: name }).first();
        await item.waitFor({ state: 'visible', timeout: 10000 });
        await item.click();
    }
    
}