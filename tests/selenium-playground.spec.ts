import { test } from '../common/fixture';
import { expect } from '@playwright/test';

const baseUrl = 'https://www.lambdatest.com/selenium-playground/';

test.beforeEach(async ({ page, log }) => {
    log.step(`Navigate to \'${baseUrl}\'.`);
    await page.goto(baseUrl);
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

test.describe('\'Input Form Submit\' Page Tests', () => {

    const hyperlinkText = 'Input Form Submit';

    test('Validate that the \'Form Demo\' page is successfully submitted.', async ({ page, log }) => {
        // Arrange
        const name = 'John Doe';
        const email = 'johndoe@email.com';
        const password = 'Password123';
        const company = 'Test Company, Inc.';
        const website = 'https://www.google.com/';
        const country = 'United States';
        const city = 'Test City';
        const address1 = '999 Validation Ave';
        const address2 = 'Suite #100';
        const state = 'Alabama';
        const zipCode = '54321';
        const expectedMessageText = 'Thanks for contacting us, we will get back to you shortly.';

        // Act
        log.step(`Click the \'${hyperlinkText}\' hyperlink.`);
        const hyperlink = await page.getByRole('link', { name: hyperlinkText });
        await hyperlink.click();

        log.step('Click the \'Submit\' button.');
        const submitButton = await page.getByRole('button', { name: 'Submit' })
        await submitButton.click();

        log.step('Validate that the \'Please fill out this field\' error message is displayed for the \'Name\' field.');
        const nameTextbox = await page.getByPlaceholder('Name', { exact: true });
        const textboxAlert = await nameTextbox.evaluate((inputElement) => {
            const input = inputElement as HTMLInputElement;
            input.reportValidity();
            return input.validationMessage;
        });
        await expect(textboxAlert).toMatch(/.*(Please F|f)ill out this field/i);

        log.step('Enter value into the \'Name\' textbox.')
        await nameTextbox.fillSafely(name);

        log.step('Enter value into the \'Email\' textbox.')
        const emailTextbox = await page.getByPlaceholder('Email', { exact: true })
        await emailTextbox.fillSafely(email);

        log.step('Enter value into the \'Password\' textbox.')
        const passwordTextbox = await page.getByPlaceholder('Password', { exact: true });
        await passwordTextbox.fillSafely(password);

        log.step('Enter value into the \'Company\' textbox.')
        const companyTexbox = await page.getByPlaceholder('Company', { exact: true });
        await companyTexbox.fillSafely(company);

        log.step('Enter value into the \'Website\' textbox.')
        const websiteTextbox = await page.getByPlaceholder('Website', { exact: true });
        await websiteTextbox.fillSafely(website);

        log.step('Enter value into the \'Country\' textbox.')
        const countryCombobox = await page.getByRole('combobox');
        await countryCombobox.selectOption(country);

        log.step('Enter value into the \'City\' textbox.')
        const cityTextbox = await page.getByPlaceholder('City', { exact: true });
        await cityTextbox.fillSafely(city);

        log.step('Enter value into the \'Address 1\' textbox.')
        const address1Textbox = await page.getByPlaceholder('Address 1', { exact: true });
        await address1Textbox.fillSafely(address1);

        log.step('Enter value into the \'Address 2\' textbox.')
        const address2Textbox = await page.getByPlaceholder('Address 2', { exact: true });
        await address2Textbox.fillSafely(address2);

        log.step('Enter value into the \'State\' textbox.')
        const stateTextbox = await page.getByPlaceholder('State', { exact: true });
        await stateTextbox.fillSafely(state);

        log.step('Enter value into the \'Zip Code\' textbox.')
        const zipCodeTextbox = await page.getByPlaceholder('State', { exact: true });
        await zipCodeTextbox.fillSafely(zipCode);

        log.step('Click the \'Submit\' button.');
        await submitButton.click();

        // Assert
        log.step(`Validate that the \'${expectedMessageText}\' message is successfully displayed.`);
        const actualMessageText = await page.locator('//p[contains(@class,\'success-msg\')]').innerText();
        await expect(actualMessageText).toBe(expectedMessageText);
    });
});