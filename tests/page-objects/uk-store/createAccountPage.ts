import { Page } from '@playwright/test';
import { Block } from '../../locators/block';
import { BasePage } from '../base-page';
import {Button} from "../../locators/button";
import {Input} from "../../locators/input";

export class CreateAccountPage extends BasePage {
    baseURL: string;

    constructor(page: Page, baseURL: string) {
        super(page);
        this.baseURL = baseURL;
    }

    async goto(searchTerm: string) {
        const url = `https://teststore.automationtesting.co.uk/index.php?controller=registration`;
        await this.page.goto(url);
    }

    async open(): Promise<void> {
        await this.page.goto(this.baseURL, {waitUntil: "domcontentloaded"});
    }

    get createAccountHeader(): Block {
        return new Block(this.page.locator('[class="page-header"]').getByText('Create an account'), "Заголовок создания нового аккаунта");
    }

    get femaleGenderRadioButton(): Button{
        return new Button(this.page.locator('[id="field-id_gender-2"]'), "Кнопка выбора женского пола для нового пользователя");
        }

    get firstNameInputField(): Input{
        return new Input(this.page.locator('[id="field-firstname"]'), "Поле для ввода имени нового пользователя");
        }

    get lastNameInputField(): Input{
        return new Input(this.page.locator('[id="field-lastname"]'), "Поле для ввода фамилии нового пользователя");
    }

    get emailInputField(): Input{
        return new Input(this.page.locator('[id="field-email"]'), "Поле для ввода емейла");
    }

    get passwordInputField(): Input{
        return new Input(this.page.locator('[id="field-password"]'), "Поле для ввода пароля");
    }

    get showPasswordButton(): Button{
        return new Button(this.page.locator('[data-action="show-password"]'), "Кнопка для показа пароля");
    }

    get visiblePasswordInput(): Input{
        return new Input(this.page.locator('[aria-label="Password input"][type="text"]'), "Видимый пароль");
    }

    get birthdayInputField(): Input{
        return new Input(this.page.locator('[id="field-birthday"]'), "Поле для ввода дня рождения");
    }

    get receiveOffersButton(): Button{
        return new Button(this.page.getByText("Receive offers from our partners"),"Кнопка согласия получения предложений от партнеров");
    }

    get agreeToTermsButton(): Button{
        return new Button(this.page.getByText("I agree to the terms and conditions and the privacy policy"),"Кнопка согласия c условиями");
    }

    get signUpForNewsletterButton(): Button{
        return new Button(this.page.locator('[name="newsletter"]'),"Кнопка подписки на рассылку");
    }

    get saveNewAccountButton(): Button{
        return new Button(this.page.locator('[class*="form-control-submit"]'),"Кнопка сохранения данных нового пользователя");
    }

    get emailAlreadyUsedNotification(): Block {
        return new Block(this.page.locator('[class*="alert-danger"]').getByText('The email is already used, please choose another one or sign in'), "Оповещение, что такой адрес уже используется");
    }






    //
    // get signInButton(): Button{
    //     return new Button(this.page.locator('[id="submit-login"]'), "Кнопка Sign In");
    // }
    //
    // get accountRegistrationLink(): Button{
    //     return new Button(this.page.locator('[data-link-action*="register"]'), "Ссылка для регистрации нового аккаунта");
    // }
    //
    // get authenticationFailedNotification(): Block {
    //     return new Block(this.page.locator('[class*="danger"]'), "Оповещение о несработавшей авторизации");
    // }


}