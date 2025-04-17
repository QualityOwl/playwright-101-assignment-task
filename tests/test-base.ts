import { Browser, test } from '@playwright/test';
import { Log } from '../common/log';

const log = new Log();

export class TestBase {
    async Cleanup(browser: Browser) {
        const contexts = browser.contexts();

        log.Step("Close browser.");
        for (const context of contexts) {
            await context.close();
        }
    }
}

test.beforeAll(async () => {
    log.HeaderText();
});

test.afterAll(async () => {
    log.FooterText();
});

export default test;