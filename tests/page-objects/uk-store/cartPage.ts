import {BasePage} from "../base-page";
import {Page} from "@playwright/test";
import {Block} from "../../locators/block";

export class CartPage extends BasePage {
    baseURL: string;

    constructor(page: Page, baseURL: string) {
        super(page);
        this.baseURL = baseURL;
    }

    async goto() {
        await this.page.goto('https://automationteststore.com/index.php?rt=checkout/cart');
    }

    get shoppingCartHeader(): Block {
        return new Block(this.page.locator(`[class*="frown"]`).getByText("Shopping Cart"), "Залоговок Shopping Cart")
    }
}

