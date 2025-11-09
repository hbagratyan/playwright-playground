import {BasePage} from "../base-page";
import {Page} from "@playwright/test";
import {Block} from "../../locators/block";

export class SpecialPage extends BasePage {
    baseURL: string;

    constructor(page: Page, baseURL: string) {
        super(page);
        this.baseURL = baseURL;
    }

    async goto() {
        await this.page.goto('https://automationteststore.com/index.php?rt=product/special');
    }

    get specialOffersHeader(): Block {
        return new Block(this.page.locator(`[class*="info-sign"]`).getByText("Special Offers"), "Залоговок Special Offers")
    }
}

