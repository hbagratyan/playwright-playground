import { Locator, test } from '@playwright/test';
import { BaseElement } from './base-element';

export class Table extends BaseElement {
    constructor(locator: Locator, name: string) {
        super(locator, name);
    }

    async getAllCells(): Promise<string[]> {
        let getCells: string[];
        await test.step(
            `Получить значение ячеек у [${this.name}]`,
            async () => {
                getCells = await this.locator.allInnerTexts();
                getCells = getCells.map(x => x.replace(/\n/g, '').replace('⋮', ''));
            },
            { box: true },
        );
        // @ts-ignore
        return getCells;
    }
}
