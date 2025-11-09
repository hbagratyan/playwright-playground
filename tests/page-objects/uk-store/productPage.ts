import {BasePage} from "../base-page";
import {Page} from "@playwright/test";
import {Button} from "../../locators/button";

export class ProductPage extends BasePage {
    baseURL: string;

    constructor(page: Page, baseURL: string) {
        super(page);
        this.baseURL = baseURL;
    }

    get descriptionTabHeader(): Button{
        return new Button(this.page.locator("[href='#description']"), "Заголовок табы с описанием")
    }
}