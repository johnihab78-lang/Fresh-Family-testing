import { test, expect } from '../../fixtures/admin.fixture';
test.describe("Attendance Dashboard", () => {


    test('show last 7 days', async ({ attendanceDashboard }) => {
    await attendanceDashboard.employeeDetails(); // now works
    await attendanceDashboard.last7.click();
    // Verify we remain on the overview page after selecting the range
    await expect(attendanceDashboard.page).toHaveURL(/overview/);
});


    test('map must find', async ({ attendanceDashboard }) => {
        await attendanceDashboard.employeeDetails();
        await expect(attendanceDashboard.mapFind).toBeVisible({ timeout: 15000 });
    });

    
});