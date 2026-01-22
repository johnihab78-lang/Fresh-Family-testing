import { test, expect } from "../../fixtures/admin.fixture";

test.describe('Testing Search in Attendance Dashboard', () => {
    test('search should run successfully when search by (CODE)', async ({ attendanceDashboard }) => {
        await attendanceDashboard.searchInput.click();
        await attendanceDashboard.searchByEmployeesInfo('33');
        const employeeRows = attendanceDashboard.page.locator(
            'div.cursor-pointer:has(p.font-medium)'
        );
        await expect(employeeRows).toHaveCount(1);
        await attendanceDashboard.searchInput.fill('');
    });

    test('search should run successfully when search by (NAME)', async ({ attendanceDashboard }) => {
        await attendanceDashboard.searchInput.click();
        await attendanceDashboard.searchByEmployeesInfo('demo');
        const employeeRows = attendanceDashboard.page.locator(
            'div.cursor-pointer:has(p.font-medium)'
        );
        await expect(employeeRows).toHaveCount(4);
    });
});