import { Input } from '../../../locators/input';
import { Button } from '../../../locators/button';
import { Page } from '@playwright/test';
import { Block } from '../../../locators/block';
import { BasePage } from '../base-page';

export class StoreMainPage extends BasePage {
    baseURL: string;

    constructor(page: Page, baseURL: string) {
        super(page);
        this.baseURL = baseURL;
    }

    get mainLogo(): Block {
        return new Button(this.page.locator('[title="Automation Test Store"]'), 'Войти');
    }

    async open(): Promise<void> {
        await this.page.goto(this.baseURL, {waitUntil: "domcontentloaded"});
    }
}
