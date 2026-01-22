import { Page, Locator } from "@playwright/test";

export class AdminDashboard {
    readonly page: Page;
    // Authority Management
    readonly titlePage: Locator;
    readonly searchByCode: Locator;
    readonly toastMessageInvalid: Locator;
    // Role Management
    readonly roleManagement: Locator;
    readonly newRole: Locator;
    readonly addRole: Locator;
    readonly roleNameInput: Locator;
    readonly roleDescriptionInput: Locator;
    readonly invalidRoleName: Locator;

    constructor(page: Page) {
        this.page = page;
        // Authority Management
        this.titlePage = page.getByRole('heading', { name: "Admin Panel" });
        this.searchByCode = page.locator('input[name="employee_code"]');
        this.toastMessageInvalid = page.locator('li[data-sonner-toast][data-visible="true"]', { hasText: 'Failed to fetch user' });
        // Role Management
        this.roleManagement = page.getByRole('button', { name: "Role Management" });
        this.newRole = page.getByRole('button', { name: "New" });
        this.addRole = page.getByRole('button', { name: "Create Role" });
        this.roleNameInput = page.locator('input[name="name"]');
        this.roleDescriptionInput = page.locator('textarea[data-slot="textarea"]');
        this.toastMessageInvalid = page.locator('li[data-sonner-toast][data-visible="true"]', { hasText: 'Failed to create role' });
        this.invalidRoleName = page.getByText(
            'Role name must be lowercase with underscores (e.g., sales_manager)',
            { exact: true }
        );
    }
    // Authority Management
    async waitForLoad() {
        await this.page.waitForURL(/admin-dashboard\/authority-management/, { timeout: 10000 });
        await this.page.waitForLoadState('networkidle');
    }

    async searchEmployeeByCode(code: string) {
        await this.searchByCode.fill(code);
        const searchButton = this.page.locator('button[type="submit"]:has(svg[aria-hidden="true"])');
        await searchButton.click();
    }

    getEmployeeByName(name: string): Locator {
        return this.page.getByText(name).first();
    }

    // Role Management
    async createRole(roleName: string, description: string) {
        await this.roleNameInput.fill(roleName);
        await this.roleDescriptionInput.fill(description);
    }
}