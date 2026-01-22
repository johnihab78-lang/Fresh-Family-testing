import { test, expect } from '../../../fixtures/api.fixture';
import { CurrentUser } from '../../../api/users/currentUser.api';

test.describe('Dashboard Accessible API', () => {
    
    test('get Dashboard Accessible', async ({ apiContext }) => {
        const userApi = new CurrentUser(apiContext);
        const response = await userApi.getCurrentUser({
            token: process.env.API_TOKEN,
        });

        expect(response.status()).toBe(200);
        const body = await response.json();

        expect(body).toHaveProperty('id');
    })
})