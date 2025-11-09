import { Page, test } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async reload(): Promise<void> {
        await test.step(`Перезагрузить страницу`, async () => {
            await this.page.reload();
        });
    }

    async clearCookies(): Promise<void> {
        await test.step(`Очистить Cookies страницы`, async () => {
            await this.page.context().clearCookies();
        });
    }

    async openWithDomWaiting(url: string, retryCount = 2): Promise<void> {
        if (retryCount < 0) {
            throw new Error(`Failed to navigate to ${url} after 3 retries.`);
        }
        await Promise.all([
            this.page.goto(url, {
                timeout: 15 * 1000,
                waitUntil: 'load',
            }),
            this.page.waitForResponse(response => response.ok(), { timeout: 8000 }),
        ]).catch(async () => {
            await this.openWithDomWaiting(url, retryCount - 1);
        });
    }

    /*
     * Метод возвращает truе, если браузер получит ответ на запрос
     *  в url которого присутствует - partialUrl
     *  и статус код соответствует - statusCode
     * @param {string} partialUrl - URL нужного нам запроса
     * @param {number} statusCode - ожидаемый статус респонса
     * @returns {!Promise<boolean>}
     * returns false if wrong URL or wrong expected status
     */
    checkResponseStatusCode(partialUrl: string, statusCode = 200): Promise<boolean> {
        return test.step(`Запрос с ${partialUrl} в url вернул статус код: ${statusCode}`, async () =>
            new Promise(resolve => {
                this.page.on('response', response => {
                    const isIncludeUrl = response.url().includes(partialUrl);
                    const isSuccessStatus = response.status() === statusCode;
                    if (isIncludeUrl) {
                        if (isSuccessStatus) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }
                });
            }));
    }
}
