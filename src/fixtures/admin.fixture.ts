import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AdminLayoutPage } from '../pages/admin/admin.layout.page';
import { AttendanceDashboard } from '../pages/admin/dashboards/AttendanceDashboard.page';
import { AdminDashboard } from '../pages/admin/dashboards/AdminDashboard.page';
import { AppraisalsDashboard } from '../pages/admin/dashboards/AppraisalsDashboard.page';
import dotenv from 'dotenv';
import { HRDashboard } from '../pages/admin/dashboards/HRDashboard.page';
import { SalesDashboard } from '../pages/admin/dashboards/SalesDashboard.page';
dotenv.config();

type AdminFixtures = {
    adminLayout: AdminLayoutPage;
    attendanceDashboard: AttendanceDashboard;
    adminDashboard: AdminDashboard;
    appraisalsDashboard: AppraisalsDashboard;
    hrDashboard: HRDashboard;
    salesDashboard: SalesDashboard;
    storageState: string;
};

export const test = base.extend<AdminFixtures>({
    adminLayout: async ({ page, context }, use) => { 
        await context.addCookies
            ([
                { name: 'theme', value: 'dark', domain: process.env.DOMAIN!, path: '/' }, 
                { name: 'NEXT_LOCALE', value: 'en', domain: process.env.DOMAIN!, path: '/' },
            ]); 
            // navigate to base and check if already authenticated (storageState will populate auth)
            const baseUrl = process.env.BASE_URL;
            await page.goto(baseUrl!);

            const adminLayout = new AdminLayoutPage(page);
            try {
                await adminLayout.drawerItems.first().waitFor({ state: 'visible', timeout: 2000 });
                // already logged in via storageState
                await use(adminLayout);
                return;
            } catch (e) {
                // not logged in, perform UI login
            }

            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.enterEmployeeCode(process.env.EMPLOYEE_CODE!);
            await loginPage.enterVerificationNums(process.env.VERIFICATION_CODE!);

            await use(adminLayout);
    },

    attendanceDashboard: async ({ page, adminLayout }, use) => {
        await adminLayout.openDashboard('Attendance');
        await page.waitForURL(/attendance-dashboard\/overview/, { timeout: 10000 });

        const attendanceDashboard = new AttendanceDashboard(page);
        await attendanceDashboard.waitForLoad();

        await use(attendanceDashboard);
    },

    adminDashboard: async ({ page, adminLayout }, use) => {
        await adminLayout.openDashboard('Admin');
        await page.waitForURL(/admin-dashboard\/authority-management/, { timeout: 10000 });

        const adminDashboard = new AdminDashboard(page);
        await adminDashboard.waitForLoad();

        await use(adminDashboard);
    },

    appraisalsDashboard: async ({ page, adminLayout }, use) => {
        await adminLayout.openDashboard('Appraisals');
        await page.waitForURL(/appraisals-dashboard\/employee\/overview/, { timeout: 10000 });

        const appraisalsDashboard = new AppraisalsDashboard(page);
        await appraisalsDashboard.waitForLoad();

        await use(appraisalsDashboard);
    },
    
    hrDashboard: async ({ page, adminLayout }, use) => {
        await adminLayout.openDashboard('HR');
        await page.waitForURL(/hr-dashboard\/overview/, { timeout: 10000 });

        const hrDashboard = new HRDashboard(page);
        await hrDashboard.waitForLoad();

        await use(hrDashboard);
    },

    salesDashboard: async ({ page, adminLayout }, use) => {
        await adminLayout.openDashboard('Sales');
        await page.waitForURL(/sales-dashboard\/visit-planning/, { timeout: 10000 });

        const salesDashboard = new SalesDashboard(page);
        await salesDashboard.waitForLoad();

        await use(salesDashboard);
    },
    

});

export { expect } from '@playwright/test';