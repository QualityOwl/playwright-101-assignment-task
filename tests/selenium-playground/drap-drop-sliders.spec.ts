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

test.describe('\'Drag & Drop Sliders\' Page Tests', () => {

    const hyperlinkText = 'Drag & Drop Sliders';

    test('Validate that the slider value is successfully changed to value \'95\'.', async ({ page, log }) => {
        // Arrange
        const sliderDefaultValue = 15;
        const expectedSliderValue = 95;

        // Act
        log.step(`Click the \'${hyperlinkText}\' hyperlink.`);
        const hyperlink = await page.getByRole('link', { name: hyperlinkText });
        await hyperlink.click();

        log.step(`Change \'Default value ${sliderDefaultValue}\' slider value to \'${expectedSliderValue}\'.`);
        const parent = await page.locator(`//div[contains(@id,'slider')][contains(.,\'Default value ${sliderDefaultValue}\')]`);
        const slider = await parent.locator('//input[@type=\'range\']');
        const box = await slider.waitForBoundingBox();
        const xPos = await box.x;
        const yPos = await (box.y + box.height / 2);
        await page.mouse.move(xPos, yPos);
        await page.waitForTimeout(250);
        await page.mouse.down();
        await page.waitForTimeout(250);
        await page.mouse.move(xPos + 465, yPos, { steps: 5 });
        await page.waitForTimeout(250);
        await page.mouse.up();

        // Assert
        log.step(`Validate that the \'Default value ${sliderDefaultValue}\' slider box displays as \'${expectedSliderValue}\'.`);
        const sliderValueBox = await parent.locator('//output[contains(@id,\'range\')]');
        const sliderValueBoxText = await sliderValueBox.textContent();
        await expect(sliderValueBoxText).toContain(expectedSliderValue.toString());
    });
});