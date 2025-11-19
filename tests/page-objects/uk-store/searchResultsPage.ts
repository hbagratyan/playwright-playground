import { Page } from '@playwright/test';
import { Block } from '../../locators/block';
import { BasePage } from '../base-page';
import {Button} from "../../locators/button";

export class SearchResultsPage extends BasePage {
    baseURL: string;

    constructor(page: Page, baseURL: string) {
        super(page);
        this.baseURL = baseURL;
    }

    async goto(searchTerm: string) {
        const url = `https://teststore.automationtesting.co.uk/index.php?controller=search&s=${searchTerm}`;
        await this.page.goto(url);
    }

    get searchResultsHeader(): Block {
        return new Block(this.page.locator('[id="js-product-list-header"]'), "Заголовок результатов поиска")
    }

    get firstProductButton(): Button {
        return new Button(this.page.locator('[class*="product-thumbnail"]').first(), "Первая карточка в секции найденных товаров")
    }

    get firstProductTitle(): Button {
        return new Button(this.page.locator('[class="h3 product-title"]').first(), "Название первого из найденных товаров")
    }

    get noMatchesFoundHeader(): Block {
        return new Block(this.page.locator('[class*="not-found"]'), "Отсутствие совпадений в результатах поиска")
    }

    get sortOrderDropdown(): Button {
        return new Button(this.page.locator('[class="col-xs-12 col-sm-12 col-md-9 products-sort-order dropdown"]'), "Меню сортировки")
    }

    get sortAtoZ(): Button {
        return new Button(this.page.getByText('Name, A to Z'), "Cортировка A-Z")
    }

    get productTitles() {
        return this.page.locator('.product-title a');
    }

    async open(): Promise<void> {
        await this.page.goto(this.baseURL, {waitUntil: "domcontentloaded"});
    }
}