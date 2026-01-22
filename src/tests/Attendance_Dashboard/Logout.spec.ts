import { test, expect } from '../../fixtures/admin.fixture';
test.describe("Attendance Dashboard", () => {


    test('user must logout', async ({ attendanceDashboard, page }) => {
        await attendanceDashboard.logout();
        await expect(page).toHaveURL(/\/login$/);
    });

    
});