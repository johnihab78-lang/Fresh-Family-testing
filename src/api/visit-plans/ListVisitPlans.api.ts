import { APIRequestContext } from '@playwright/test';

export class ListVisitPlans {
    constructor(private api: APIRequestContext) { }

    async listVisitPlans(params?: {
        page?: number;
        pageSize?: number;
        include_inactive?: boolean;
        q?: string;
        forEmployeeCode?: string;
        createdByMe: boolean;
        token?: string;
    }) {
        return this.api.get('/api/v1/visit-plans', {
            params: {
                page: params?.page ?? 1,
                pageSize: params?.pageSize ?? 100,
                include_inactive: params?.include_inactive ?? false,
                q: params?.q!,
                forEmployeeCode: params?.forEmployeeCode!,
                createdByMe: params?.createdByMe!,
            },
            headers: params?.token
                ? { Authorization: `Bearer ${params.token}` }
                : {},
        });
    }
}
