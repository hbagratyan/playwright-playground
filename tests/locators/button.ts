import { Locator, test } from '@playwright/test';
import { BaseElement } from './base-element';

export class Button extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async click(log = true): Promise<void> {
        if (!log) {
            await this.locator.click();
            return;
        }
        await test.step(
            `Нажать на кнопку [${this.name}]`,
            async () => {
                await this.locator.click();
            },
            { box: true },
        );
    }

    async doubleClick(log = true): Promise<void> {
        if (!log) {
            await this.locator.dblclick();
            return;
        }
        await test.step(
            `Двойное нажатие на кнопку [${this.name}]`,
            async () => {
                await this.locator.dblclick();
            },
            { box: true },
        );
    }

    async forceClick(): Promise<void> {
        await test.step(
            `Нажать на кнопку [${this.name}] принудительно`,
            async () => {
                // eslint-disable-next-line playwright/no-force-option
                await this.locator.click({ force: true });
            },
            { box: true },
        );
    }
}
