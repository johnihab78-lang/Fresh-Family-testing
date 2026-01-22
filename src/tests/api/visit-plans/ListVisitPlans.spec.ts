import { ListVisitPlans } from '../../../api/visit-plans/ListVisitPlans.api';
import { test, expect } from '../../../fixtures/api.fixture';

test.describe('List Visit Plans API', () => {
    
    test('should fetch visit plans for an employee', async ({ apiContext }) => {
        const userApi = new ListVisitPlans(apiContext);
        const response = await userApi.listVisitPlans({
            page: 8044,
            pageSize: 194,        // requested size
            include_inactive: false,
            q: 'string',
            forEmployeeCode: process.env.EMPLOYEE_CODE!,
            createdByMe: false,
            token: process.env.API_TOKEN,
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('data');
        expect(Array.isArray(body.data)).toBeTruthy();
        expect(body).toHaveProperty('total');
        
        // Make sure this matches actual returned value
        expect(body).toHaveProperty('pageSize');  
    });
});
