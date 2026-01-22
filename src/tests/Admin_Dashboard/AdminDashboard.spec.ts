import { test, expect } from '../../fixtures/admin.fixture';

test.describe("Admin Dashboard", () => {

    test('Admin Dashboard contails a title Admin Panel', async ({ adminDashboard })=> {
        await adminDashboard.waitForLoad();
        await expect (adminDashboard.titlePage).toBeVisible();
    })
});