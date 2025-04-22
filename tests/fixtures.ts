import { test as base } from '@playwright/test';
import { Log } from '../common/log';
import { TestBase } from './test-base'
export { expect } from '@playwright/test';

export const test = base.extend<{
    log: Log;
    testBase: TestBase
}>({
    log: async ({ }, use, testInfo) => {
        const logger = new Log(testInfo.title);     // unique for this test
        await use(logger);                          // make it available in the test
        logger.flush(testInfo.status ?? 'unknown'); // flush after the test finishes
    },
    testBase: async ({ log }, use) => {
        await use(new TestBase(log))
    }
});