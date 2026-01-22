import { test as base, request } from '@playwright/test';

type ApiFixtures = {
    apiContext: any;
};

export const test = base.extend<ApiFixtures>({
    apiContext: async ({}, use) => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
            },
        });

        await use(context);
        await context.dispose();
    },
});

export { expect } from '@playwright/test';
