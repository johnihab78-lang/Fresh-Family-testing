import { test, expect } from '../../fixtures/admin.fixture';

test.describe("Sales Dashboard", () => {

    test('Sales Dashboard', async ({ salesDashboard }) => {
        await salesDashboard.waitForLoad();

        await expect(salesDashboard.titlePage).toBeVisible();
    });

});