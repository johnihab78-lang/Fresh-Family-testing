import { APIRequestContext } from '@playwright/test';

export class EmployeeApi {
    constructor(private api: APIRequestContext) { }

    async getEmployee(params?: {
        employeeCode?: string;
        token?: string;
    }) {
        return this.api.get('/api/v1/users/lookup/name', {
            params: {
                employeeCode: params?.employeeCode!,
            },
            headers: params?.token
                ? { Authorization: `Bearer ${params.token}` }
                : {},
        });
    }
}
