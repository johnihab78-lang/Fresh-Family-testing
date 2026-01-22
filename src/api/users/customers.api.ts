import { APIRequestContext } from '@playwright/test';

export class UsersApi {
    constructor(private api: APIRequestContext) { }

    async getCustomers(params?: {
        page?: number;
        size?: number;
        include_inactive?: boolean;
        q?: string;
        channelCode?: string;
        token?: string;
    }) {
        return this.api.get('/api/v1/users/me/customers', {
            params: {
                page: params?.page ?? 1,
                size: params?.size ?? 100,
                include_inactive: params?.include_inactive ?? false,
                q: params?.q!,
                channelCode: params?.channelCode!,
            },
            headers: params?.token
                ? { Authorization: `Bearer ${params.token}` }
                : {},
        });
    }
}
