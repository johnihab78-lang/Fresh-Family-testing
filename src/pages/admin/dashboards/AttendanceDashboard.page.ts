import { Page, Locator } from '@playwright/test';

export class AttendanceDashboard {

    readonly page: Page;
    readonly titlePage: Locator;
    readonly searchInput: Locator;
    readonly logoutButton: Locator;
    readonly mapFind: Locator;
    readonly last7: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titlePage = page.getByRole('heading', { name: "Attendance" });
        this.searchInput = page.locator(
            'input[placeholder="Search employees by name, role, or status..."]'
        );
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
        this.mapFind = page.locator('.leaflet-container');
        this.last7 = page.getByRole('button', { name: 'Last 7 Days' });
    }

    async waitForLoad() {
        await this.page.waitForURL(/attendance-dashboard\/overview/, { timeout: 10000 });
        await this.page.waitForLoadState('networkidle');
    }


    async searchByEmployeesInfo(text: string) {
        await this.searchInput.fill(text);
    }
    async employeeDetails() {
    // Return the locator so it can be clicked
    return this.page.getByText('demo user').first().click()
}
    /** Employee row by code */
    employeeRowByCode(code: string): Locator {
        return this.page.locator(
            'div.cursor-pointer',
            { has: this.page.locator('span.font-mono', { hasText: code }) }
        );
    }

    /** Eye icon inside employee row */
    viewDetailsButton(code: string): Locator {
        // Match several possible button variants: explicit data-slot, aria, or an svg icon
        return this.employeeRowByCode(code).locator(
            'button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-eye)'
        );
    }

    /** Popup dialog */
    detailsPopup(): Locator {
        return this.page.getByRole('dialog');
    };

    async logout() {
        await this.logoutButton.click();
    }
}