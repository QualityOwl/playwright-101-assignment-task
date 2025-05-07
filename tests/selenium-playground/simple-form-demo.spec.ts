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

test.describe('\'Simple Form Demo\' Page Tests', () => {

    const hyperlinkText = 'Simple Form Demo';

    test('Validate that the \'Your Message\' field displays the correct text.', async ({ page, log }) => {
        // Arrange
        const expectedUrl = 'simple-form-demo';
        const messageText = 'Welcome to LambdaTest';

        // Act
        log.step(`Click the \'${hyperlinkText}\' hyperlink.`);
        const hyperlink = await page.getByRole('link', { name: hyperlinkText });
        await hyperlink.click();

        // Assert
        log.step(`Validate that the user is successfully navigated to the \'${expectedUrl}\' page.`);
        const currentPageUrl = await page.url();
        await expect(currentPageUrl).toContain(expectedUrl);

        // Act
        log.step(`Enter \'${messageText}\' into the \'Enter Message\' text box.`);
        const enterMessageTextbox = await page.locator('//input[@id=\'user-message\']');
        await enterMessageTextbox.fillSafely(messageText);

        log.step(`Click the \'Get Checked Value\' button.`);
        const getCheckValueButton = await page.getByRole('button', { name: 'Get Checked Value' });
        await getCheckValueButton.click();

        // Assert
        log.step(`Validate that the \'Your Message:\' field displays \'${messageText}\'.`);
        const yourMessageField = await page.locator('//p[@id=\'message\']');
        await yourMessageField.waitForInnerText();
        const yourMessageFieldText = await yourMessageField.textContent();
        await expect(yourMessageFieldText).toBe(messageText);
    });
});