import { test, expect } from '../../fixtures/admin.fixture';

test.describe("HR Dashboard", () => {

    test('HR Dashboard', async ({ hrDashboard }) => {
        await hrDashboard.waitForLoad();

        await expect(hrDashboard.titlePage).toBeVisible();
    });

});