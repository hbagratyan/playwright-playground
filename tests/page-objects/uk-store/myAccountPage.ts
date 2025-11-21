import { Page } from '@playwright/test';
import { Block } from '../../locators/block';
import { BasePage } from '../base-page';

export class MyAccountPage extends BasePage {
    baseURL: string;

    constructor(page: Page, baseURL: string) {
        super(page);
        this.baseURL = baseURL;
    }

    async goto(searchTerm: string) {
        const url = `https://teststore.automationtesting.co.uk/index.php?controller=my-account`;
        await this.page.goto(url);
    }

    async open(): Promise<void> {
        await this.page.goto(this.baseURL, {waitUntil: "domcontentloaded"});
    }

    get yourAccountHeader(): Block {
        return new Block(this.page.locator('[class="page-header"]').getByText('Your account'), "Заголовок результатов поиска");
    }


}