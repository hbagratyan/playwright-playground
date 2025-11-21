import { Page } from '@playwright/test';
import { Block } from '../../locators/block';
import { BasePage } from '../base-page';
import {Button} from "../../locators/button";
import {Input} from "../../locators/input";

export class SignInPage extends BasePage {
    baseURL: string;

    constructor(page: Page, baseURL: string) {
        super(page);
        this.baseURL = baseURL;
    }

    async goto(searchTerm: string) {
        const url = `https://teststore.automationtesting.co.uk/index.php?controller=authentication?back=https%3A%2F%2Fteststore.automationtesting.co.uk%2Findex.php`;
        await this.page.goto(url);
    }

    async open(): Promise<void> {
        await this.page.goto(this.baseURL, {waitUntil: "domcontentloaded"});
    }

    get logInToYourAccountHeader(): Block {
        return new Block(this.page.locator('[class="page-header"]').getByText('Log in to your account'), "Заголовок результатов поиска");
    }

    get emailInputField(): Input{
        return new Input(this.page.locator('[id="field-email"]'), "Поле для ввода емейла");
    }

    get passwordInputField(): Input{
        return new Input(this.page.locator('[id="field-password"]'), "Поле для ввода пароля");
    }

    get signInButton(): Button{
        return new Button(this.page.locator('[id="submit-login"]'), "Кнопка Sign In");
    }

    get accountRegistrationLink(): Button{
        return new Button(this.page.locator('[data-link-action*="register"]'), "Ссылка для регистрации нового аккаунта");
    }

    get authenticationFailedNotification(): Block {
        return new Block(this.page.locator('[class*="danger"]'), "Оповещение о несработавшей авторизации");
    }


}