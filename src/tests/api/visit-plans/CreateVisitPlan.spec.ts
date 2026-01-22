import { test, expect } from '../../../fixtures/api.fixture';
import { CreateVisitPlan } from '../../../api/visit-plans/CreateVisitPlan.api';

test.describe('Create Visit Plan API', () => {
    
    test('should create a new visit plan', async ({ apiContext }) => {
        const visitPlanApi = new CreateVisitPlan(apiContext);

        const response = await visitPlanApi.createVisitPlan({
            startDate: '2026-01-21',
            months: 5,
            entries: [
                { customerCode: 'CUST001', weekdays: [1, 3, 5] },
                { customerCode: 'CUST002', weekdays: [2, 4] }
            ],
            employeeCode: process.env.EMPLOYEE_CODE ?? null,
            title: 'New Visit Plan',
            notes: 'Automated test plan',
            token: process.env.API_TOKEN
        });

        expect(response.status()).toBe(201); // usually POST returns 201

        const body = await response.json();

        expect(body).toHaveProperty('id');          // assuming API returns new plan ID
        expect(body).toHaveProperty('startDate');
        expect(body).toHaveProperty('months', 5);
        expect(body).toHaveProperty('entries');
        expect(Array.isArray(body.entries)).toBeTruthy();
        expect(body).toHaveProperty('title', 'New Visit Plan');
    });
});
