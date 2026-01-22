import { test, expect } from '../../../fixtures/api.fixture';
import { ListAllRoles } from '../../../api/roles/allRoles.api';

test.describe('Dashboard Accessible API', () => {
    
    test('get Dashboard Accessible', async ({ apiContext }) => {
        const userApi = new ListAllRoles(apiContext);
        const response = await userApi.getAllRoles({
            token: process.env.API_TOKEN,
        });

        expect(response.status()).toBe(200);
        const body = await response.json();

        expect(body).toHaveProperty('roles');
        expect(Array.isArray(body.roles)).toBe(true);
        expect(body.roles.length).toBeGreaterThan(0);
        expect(body.roles[0].name).not.toBeNull();
    })
})