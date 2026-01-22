import { test, expect } from '../../../fixtures/api.fixture';
import { UsersApi } from '../../../api/users/customers.api';

test.describe('Customer API', () => {
    
    test('get Customer API', async ({ apiContext }) => {
        const userApi = new UsersApi(apiContext);
        const response = await userApi.getCustomers({
            page: 1,
            size: 100,
            include_inactive: false,
            q: 'string',
            channelCode: 'string',
            token: process.env.API_TOKEN,
        });

        expect(response.status()).toBe(200);
        const body = await response.json();

        expect(body).toHaveProperty('data');
        expect(Array.isArray(body.data)).toBeTruthy();
        expect(body).toHaveProperty('total');
    })
})