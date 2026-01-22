import { test, expect } from '../../../fixtures/api.fixture';
import { EmployeeApi } from '../../../api/users/employeeName.api';

test.describe('Employee API', () => {
    
    test('get Employee Name', async ({ apiContext }) => {
        const userApi = new EmployeeApi(apiContext);
        const response = await userApi.getEmployee({
            employeeCode: '60956',
            token: process.env.API_TOKEN,
        });

        expect(response.status()).toBe(200);
        const body = await response.json();

        expect(body).toHaveProperty('employee_code', "60956");
        expect(body).toHaveProperty('arabic_name');
        expect(body).toHaveProperty('display_name');
        expect(body).toHaveProperty('english_name');
    })
})