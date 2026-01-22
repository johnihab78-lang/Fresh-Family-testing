import { APIRequestContext } from '@playwright/test';

export class DashboardAccessible {
    constructor(private api: APIRequestContext) { }

    async getDashboards(params?: {
        token?: string;
    }) {
        return this.api.get('/api/v1/users/me/dashboards', {
            headers: params?.token
                ? { Authorization: `Bearer ${params.token}` }
                : {},
        });
    }
}
