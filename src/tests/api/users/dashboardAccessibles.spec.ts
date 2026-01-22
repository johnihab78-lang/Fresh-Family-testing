import { test, expect } from '../../../fixtures/api.fixture';
import { DashboardAccessible } from '../../../api/users/dashboardName.api';

test.describe('Dashboard Accessible API', () => {
    
    test('get Dashboard Accessible', async ({ apiContext }) => {
        const userApi = new DashboardAccessible(apiContext);
        const response = await userApi.getDashboards({
            token: process.env.API_TOKEN,
        });

        expect(response.status()).toBe(200);
        const body = await response.json();

        expect(body).toHaveProperty('total', 1);
    })
})