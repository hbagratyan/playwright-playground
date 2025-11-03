import {BasePage} from "../base-page";
import {Page} from "@playwright/test";
import {Block} from "../../../locators/block";

export class LoginPage extends BasePage {
    baseURL: string;

    constructor(page: Page, baseURL: string) {
        super(page);
        this.baseURL = baseURL;
    }

    async goto() {
        await this.page.goto('https://automationteststore.com/index.php?rt=account/login');
    }

    get accountLoginHeader(): Block {
        return new Block(this.page.locator(`[class="heading1"]`).getByText("Account Login"), "Залоговок Account Login")
    }
}

