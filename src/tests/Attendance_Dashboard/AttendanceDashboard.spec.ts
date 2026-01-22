import { test, expect } from '../../fixtures/admin.fixture';

test.describe("Attendance Dashboard", () => {

    test('Attendance Dashboard', async ({ attendanceDashboard }) => {
        await attendanceDashboard.waitForLoad();

        await expect(attendanceDashboard.titlePage).toBeVisible();
    });

});