import { test, expect, Locator } from '@playwright/test';
import { TestBase } from './test-base';
import { Log } from '../common/log';

const testBase = new TestBase();
const log = new Log();
const baseUrl = 'https://www.lambdatest.com/selenium-playground/';

test.beforeEach(async ({ page }) => {
    log.Step(`Navigate to \'${baseUrl}\'.`);
    await page.goto(baseUrl);
});

test.afterEach(async ({ browser }) => {
    await testBase.Cleanup(browser);
});

test.describe('\'Simple Form Demo\' Page Tests', () => {

    const hyperlinkText = 'Simple Form Demo';

    test('Validate that the \'Your Message\' field displays the correct text.', async ({ page }) => {
        // Arrange
        const expectedUrl = 'simple-form-demo';
        const messageText = 'Welcome to LambdaTest';

        // Act
        log.Step(`Click the \'${hyperlinkText}\' hyperlink.`);
        const hyperlink = await page.getByRole('link', { name: hyperlinkText });
        await hyperlink.click();

        // Assert
        log.Step(`Validate that the user is successfully navigated to the \'${expectedUrl}\' page.`);
        const currentPageUrl = await page.url();
        await expect(currentPageUrl).toContain(expectedUrl);

        // Act
        log.Step(`Enter \'${messageText}\' into the \'Enter Message\' text box.`);
        const enterMessageTextbox = await page.locator('//input[@id=\'user-message\']');
        await enterMessageTextbox.fill(messageText);

        log.Step(`Click the \'Get Checked Value\' button.`);
        const getCheckValueButton = await page.getByText('Get Checked Value', { exact: true });
        await getCheckValueButton.click();

        // Assert
        log.Step(`Validate that the \'Your Message:\' field displays \'${messageText}\'.`);
        const yourMessageField = await page.locator('//p[@id=\'message\']');
        await waitForInnerText(yourMessageField);
        const yourMessageFieldText = await yourMessageField.textContent();
        await expect(yourMessageFieldText).toBe(messageText);
    });

    async function waitForInnerText(locator: Locator, timeout: number = 5000): Promise<void> {
        await locator.waitFor({ state: 'attached', timeout });

        const start = Date.now();
        while (true) {
            const text = await locator.innerText();
            if (text.trim() !== '') break;

            if (Date.now() - start > timeout) {
                throw new Error(`Timeout waiting for non-empty innerText after ${timeout}ms`);
            }

            await new Promise(res => setTimeout(res, 100)); // Small delay between checks
        }
    }
});

test.describe('\'Drag & Drop Sliders\' Page Tests', () => {

    const hyperlinkText = 'Drag & Drop Sliders';

    test('Validate that the slider value is successfully changed to value \'95\'.', async ({ page }) => {
        // Arrange
        const sliderDefaultValue = 15;
        const expectedSliderValue = 95;

        // Act
        log.Step(`Click the \'${hyperlinkText}\' hyperlink.`);
        const hyperlink = await page.getByRole('link', { name: hyperlinkText });
        await hyperlink.click();

        log.Step(`Change \'Default value ${sliderDefaultValue}\' slider value to \'${expectedSliderValue}\'.`);
        const parent = await page.locator(`//div[contains(@id,'slider')][contains(.,\'Default value ${sliderDefaultValue}\')]`);
        const slider = await parent.locator('//input[@type=\'range\']');
        const box = await waitForBoundingBox(slider);
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
        log.Step(`Validate that the \'Default value ${sliderDefaultValue}\' slider box displays as \'${expectedSliderValue}\'.`);
        const sliderValueBox = await parent.locator('//output[contains(@id,\'range\')]');
        const sliderValueBoxText = await sliderValueBox.textContent();
        await expect(sliderValueBoxText).toContain(expectedSliderValue.toString());
    });

    async function waitForBoundingBox(
        slider: Locator,
        retries = 10,
        delayMs = 200
    ): Promise<{ x: number; y: number; width: number; height: number; }> {
        for (let i = 0; i < retries; i++) {
            const box = await slider.boundingBox();
            if (box) return box;
            await new Promise(res => setTimeout(res, delayMs));
        }
        throw new Error('Slider bounding box was not found after retries.');
    }
});

test.describe('\'Input Form Submit\' Page Tests', () => {

    const hyperlinkText = 'Input Form Submit';

    test('Validate that the \'Form Demo\' page is successfully submitted.', async ({ page }) => {
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
        log.Step(`Click the \'${hyperlinkText}\' hyperlink.`);
        const hyperlink = await page.getByRole('link', { name: hyperlinkText });
        await hyperlink.click();

        log.Step('Click the \'Submit\' button.');
        const submitButton = await page.getByRole('button', { name: 'Submit' })
        await submitButton.click();

        log.Step('Validate that the \'Please fill out this field\' error message is displayed for the \'Name\' field.');
        const nameTextbox = await page.getByPlaceholder('Name', { exact: true });
        const textboxAlert = await nameTextbox.evaluate((inputElement) => {
            const input = inputElement as HTMLInputElement;
            input.reportValidity();
            return input.validationMessage;
        });
        await expect(textboxAlert).toMatch(/.*(Please F|f)ill out this field/i);

        log.Step('Enter value into the \'Name\' textbox.')
        await nameTextbox.fill(name);

        log.Step('Enter value into the \'Email\' textbox.')
        const emailTextbox = await page.getByPlaceholder('Email', { exact: true })
        await emailTextbox.fill(email);

        log.Step('Enter value into the \'Password\' textbox.')
        const passwordTextbox = await page.getByPlaceholder('Password', { exact: true });
        await passwordTextbox.fill(password);

        log.Step('Enter value into the \'Company\' textbox.')
        const companyTexbox = await page.getByPlaceholder('Company', { exact: true });
        await companyTexbox.fill(company);

        log.Step('Enter value into the \'Website\' textbox.')
        const websiteTextbox = await page.getByPlaceholder('Website', { exact: true });
        await websiteTextbox.fill(website);

        log.Step('Enter value into the \'Country\' textbox.')
        const countryCombobox = await page.getByRole('combobox');
        await countryCombobox.selectOption(country);

        log.Step('Enter value into the \'City\' textbox.')
        const cityTextbox = await page.getByPlaceholder('City', { exact: true });
        await cityTextbox.fill(city);

        log.Step('Enter value into the \'Address 1\' textbox.')
        const address1Textbox = await page.getByPlaceholder('Address 1', { exact: true });
        await address1Textbox.fill(address1);

        log.Step('Enter value into the \'Address 2\' textbox.')
        const address2Textbox = await page.getByPlaceholder('Address 2', { exact: true });
        await address2Textbox.fill(address2);

        log.Step('Enter value into the \'State\' textbox.')
        const stateTextbox = await page.getByPlaceholder('State', { exact: true });
        await stateTextbox.fill(address2);

        log.Step('Enter value into the \'Zip Code\' textbox.')
        const zipCodeTextbox = await page.getByPlaceholder('State', { exact: true });
        await zipCodeTextbox.fill(zipCode);

        log.Step('Click the \'Submit\' button.');
        await submitButton.click();

        // Assert
        log.Step(`Validate that the \'${expectedMessageText}\' message is successfully displayed.`);
        const actualMessageText = await page.locator('//p[contains(@class,\'success-msg\')]').innerText();
        await expect(actualMessageText).toBe(expectedMessageText);
    });
});