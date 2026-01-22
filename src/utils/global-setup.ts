import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import { LoginPage } from '../pages/login.page';

dotenv.config();

const STORAGE_PATH = process.env.STORAGE_STATE_PATH!;

async function globalSetup(config: FullConfig) {

    const resolvedPath = path.resolve(STORAGE_PATH);
    await fs.mkdir(path.dirname(resolvedPath), { recursive: true });

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Use environment variables for credentials
    const emp = process.env.EMPLOYEE_CODE;
    const otp = process.env.VERIFICATION_CODE;
    if (!emp || !otp) {
        console.warn('EMPLOYEE_CODE or VERIFICATION_CODE not set in env; skipping global login.');
    } else {
        try {
            await loginPage.enterEmployeeCode(emp);
            await loginPage.enterVerificationNums(otp);

            // Wait for an admin layout indicator or URL change after login
            try {
                await page.waitForSelector('div[data-slot="card"]', { timeout: 15000 });
            } catch (e) {
                // ignore - still attempt to save storage state
            }
        } catch (err) {
            // capture debug artifacts to help diagnose why the Continue button isn't visible
            const debugDir = path.resolve('./playwright/.auth/debug');
            await fs.mkdir(debugDir, { recursive: true });
            const ts = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotPath = path.join(debugDir, `global-setup-${ts}.png`);
            const htmlPath = path.join(debugDir, `global-setup-${ts}.html`);
            try {
                await page.screenshot({ path: screenshotPath, fullPage: true });
                await fs.writeFile(htmlPath, await page.content(), 'utf8');
                // eslint-disable-next-line no-console
                console.warn(`Global setup login failed — saved debug artifacts: ${screenshotPath}, ${htmlPath}`);
            } catch (saveErr) {
                // eslint-disable-next-line no-console
                console.error('Failed saving debug artifacts', saveErr);
            }
            // rethrow to make failure visible if desired
            throw err;
        }
    }

    await context.storageState({ path: resolvedPath });
    await browser.close();
}

export default globalSetup;
