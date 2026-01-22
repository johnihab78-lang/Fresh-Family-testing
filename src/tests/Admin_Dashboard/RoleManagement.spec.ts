import { test, expect } from '../../fixtures/admin.fixture';

test.describe("Admin Dashboard", () => {
    test('Add New Role and is invalid', async ({ adminDashboard }) => {
        await adminDashboard.roleManagement.click();
        await adminDashboard.newRole.click();
        await adminDashboard.createRole(
            "test_test",
            "test_testtest_testtest_testtest_testtest_testtest_testtest_test"
        );
        await adminDashboard.addRole.click();
        await expect(adminDashboard.toastMessageInvalid).toBeFalsy();
    });

    test('add new role with upper case role name', async({ adminDashboard }) => {
        await adminDashboard.roleManagement.click();
        await adminDashboard.newRole.click();
        await adminDashboard.createRole(
            "TEST_TEST",
            "test_testtest_testtest_testtest_testtest_testtest_testtest_test"
        );
        await adminDashboard.addRole.click();
        await expect(adminDashboard.invalidRoleName).toBeVisible();
    });
});