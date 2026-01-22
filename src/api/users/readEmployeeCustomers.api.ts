import { APIRequestContext } from '@playwright/test';

export class ReadEmployeeCustomers {
    constructor(private api: APIRequestContext) { }

    async readEmployeeCustomers(params?: {
        employeeCode: string; // required
        page?: number;
        size?: number;
        include_inactive?: boolean;
        q?: string;
        channelCode?: string;
        token?: string;
    }) {
        return this.api.get(`/api/v1/users/${params?.employeeCode}/customers`, {
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
