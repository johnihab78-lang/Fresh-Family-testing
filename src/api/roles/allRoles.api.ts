import { APIRequestContext } from '@playwright/test';

export class ListAllRoles {
    constructor(private api: APIRequestContext) { }

    async getAllRoles(params?: {
        token?: string;
    }) {
        return this.api.get('/api/v1/admin/roles', {
            headers: params?.token
                ? { Authorization: `Bearer ${params.token}` }
                : {},
        });
    }
}
