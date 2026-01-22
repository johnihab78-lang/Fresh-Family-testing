import { test, expect } from '../../fixtures/admin.fixture';

test.describe("Appraisals Dashboard", () => {

    test('Appraisals Dashboard', async ({ appraisalsDashboard }) => {
        await appraisalsDashboard.waitForLoad();

        await expect(appraisalsDashboard.titlePage).toBeVisible();
    });

});