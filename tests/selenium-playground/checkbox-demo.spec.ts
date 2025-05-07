import { test } from '../../common/fixture';
import { expect } from '@playwright/test';

const homePage = '/selenium-playground/';

test.beforeEach(async ({ page, log }) => {
    log.step(`Navigate to \'${homePage}\'.`);
    await page.goto(`${homePage}`);
});

test.afterEach(async ({ browser, testBase }) => {
    await testBase.Cleanup(browser);
});

test.describe('\'Checkbox Demo\' Page Tests', () => {
    test('Validate...', async ({ page, log }) => {
        const hyperlinkText = 'Checkbox Demo';

        log.step(`Click the \'${hyperlinkText}\' hyperlink.`);
        const hyperlink = await page.getByRole('link', { name: hyperlinkText });
        await hyperlink.click();
    })
});