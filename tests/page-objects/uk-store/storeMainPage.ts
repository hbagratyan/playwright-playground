import { Button } from '../../locators/button';
import { Page } from '@playwright/test';
import { Block } from '../../locators/block';
import { BasePage } from '../base-page';
import {Input} from "../../locators/input";

export class StoreMainPage extends BasePage {
    baseURL: string;

    constructor(page: Page, baseURL: string) {
        super(page);
        this.baseURL = baseURL;
    }

    get accountTopMenuButton(): Button {
        return new Button(this.page.locator('[id="main_menu_top"] [data-id="menu_account"]'), "Кнопка Аккаунт в верхнем меню")
    }

    get specialsTopMenuButton(): Button {
        return new Button(this.page.locator('[id="main_menu_top"] [data-id="menu_specials"]'), "Кнопка Specials в верхнем меню")
    }

    get cartTopMenuButton(): Button {
        return new Button(this.page.locator('//*[@id="main_menu_top"]/li[3]/a/span'), "Кнопка Cart в верхнем меню")
    }

    get mainLogo(): Block {
        return new Button(this.page.locator('[id="_desktop_logo"]'), 'My store logo');
    }

    get navBar(): Block {
        return new Button(this.page.locator('[class*="navbar-collapse"]'), 'Верняя панель навигации');
    }

    get searchItemInput(): Input {
        return new Input(this.page.locator("[placeholder='Search Keywords']"), "Поле ввода поиска товаров по названию")
    }

    get currencyMenuButton(): Button {
        return new Button(this.page.locator('[class="block_6"]'), "Кнопка Currency, которая открывает меню с валютами")
    }

    get euroCurrencyMenuButton(): Button {
        return new Button(this.page.locator(`[class="dropdown-menu currency"]`).getByText("€ Euro"), "Опция Euro в меню валют")
    }

    async open(): Promise<void> {
        await this.page.goto(this.baseURL, {waitUntil: "domcontentloaded"});
    }
}
