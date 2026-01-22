import { test, expect } from '../../fixtures/admin.fixture';

test.describe("Admin Dashboard", () => {

    test('Search Employee Code with Valid Data', async ({ adminDashboard }) => {
        await adminDashboard.searchEmployeeByCode('60956');
        const employee = adminDashboard.getEmployeeByName('Andria Salah Roushdy');
        await expect(employee).toBeVisible();
    });

    test('Search Employee Code with Invalid Data', async ({ adminDashboard }) => {
        await adminDashboard.searchEmployeeByCode('60952');
        const toast = adminDashboard.toastMessageInvalid;
        await expect(toast).toBeVisible({ timeout: 5000 });
        await expect(toast).toContainText('Failed to fetch user');
    });
    
});