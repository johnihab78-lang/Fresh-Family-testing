import { Page, Locator } from "@playwright/test";

export class AppraisalsDashboard {
    readonly page: Page;

    // Dashboard
    readonly titlePage: Locator;

    // Goals
    readonly goals: Locator;
    readonly saveGoals: Locator;
    readonly goalsToast: Locator;

    // Skills
    readonly skills: Locator;
    readonly saveSkills: Locator;
    readonly skillsToast: Locator;

    // Needs
    readonly needs: Locator;
    readonly saveNeeds: Locator;
    readonly needsToast: Locator;

    // Job
    readonly jobs: Locator;
    readonly saveEvaluation: Locator;
    readonly jobToast: Locator;

    constructor(page: Page) {
        this.page = page;

        // Dashboard
        this.titlePage = page.getByRole("heading", { name: "Appraisals" });

        // Goals
        this.goals = page.getByRole("button", { name: "Goals" });
        this.saveGoals = page.getByRole("button", { name: "Save Goals" });
        this.goalsToast = page.locator(
            'li[data-sonner-toast][data-visible="true"]',
            { hasText: "No appraisal found" },
        );

        // Skills
        this.skills = page.getByRole("button", { name: "Skills" });
        this.saveSkills = page.getByRole("button", { name: "Save Skills" });
        this.skillsToast = page.locator(
            'li[data-sonner-toast][data-visible="true"]',
            { hasText: "Skills saved successfully!" },
        );

        // Needs
        this.needs = page.getByRole("button", { name: "Professional Needs" });
        this.saveNeeds = page.getByRole("button", { name: "Save Needs" });
        this.needsToast = page.locator(
            'li[data-sonner-toast][data-visible="true"]',
            { hasText: "Needs saved successfully!" },
        );

        // Job Evaluation
        this.jobs = page.getByRole("button", { name: "Job Evaluation" });
        this.saveEvaluation = page.getByRole("button", { name: "Save Evaluation" });
        this.jobToast = page.locator('li[data-sonner-toast][data-visible="true"]', {
            hasText: "Job evaluation saved successfully!",
        });
    }

    async waitForLoad() {
        await this.page.waitForURL(/appraisals-dashboard\/employee\/overview/, {
            timeout: 10000,
        });
        await this.page.waitForLoadState("networkidle");
    }
}
