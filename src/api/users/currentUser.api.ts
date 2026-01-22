import { APIRequestContext } from '@playwright/test';

export class CurrentUser {
    constructor(private api: APIRequestContext) { }

    async getCurrentUser(params?: {
        token?: string;
    }) {
        return this.api.get('/api/v1/users/me', {
            headers: params?.token
                ? { Authorization: `Bearer ${params.token}` }
                : {},
        });
    }
}
