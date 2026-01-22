import { APIRequestContext } from '@playwright/test';

export interface VisitPlanEntry {
    customerCode: string;
    weekdays: number[];
}

export interface CreateVisitPlanParams {
    startDate: string;       // e.g. "YYYY-MM-DD"
    months: number;
    entries: VisitPlanEntry[];
    employeeCode?: string | null; // optional, null if not assigned
    title: string;
    notes?: string | null;
    token?: string;
}

export class CreateVisitPlan {
    constructor(private api: APIRequestContext) {}

    async createVisitPlan(params: CreateVisitPlanParams) {
        return this.api.post('/api/v1/visit-plans', {
            data: {
                startDate: params.startDate,
                months: params.months,
                entries: params.entries,
                employeeCode: params.employeeCode ?? null,
                title: params.title,
                notes: params.notes ?? null,
            },
            headers: params.token
                ? { Authorization: `Bearer ${params.token}` }
                : {},
        });
    }
}
