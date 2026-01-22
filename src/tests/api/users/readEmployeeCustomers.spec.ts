import { ReadEmployeeCustomers } from '../../../api/users/readEmployeeCustomers.api';
import { test, expect } from '../../../fixtures/api.fixture';

test.describe('Customer API', () => {
    
    test('get Read mployee Customers API', async ({ apiContext }) => {
        const userApi = new ReadEmployeeCustomers(apiContext);
        const response = await userApi.readEmployeeCustomers({
            employeeCode: process.env.EMPLOYEE_CODE!,
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