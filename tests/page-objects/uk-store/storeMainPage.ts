import { Button } from '../../locators/button';
import { Page } from '@playwright/test';
import { Block } from '../../locators/block';
import { BasePage } from '../base-page';
import { Input} from "../../locators/input";

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

    get productCategoryBar(): Block {
        return new Block(this.page.locator('[id="top-menu"]'), 'Верхняя панель с категориями товаров');
    }

    get accessoriesMenuItem(): Button {
        return new Button(this.page.locator(`[class="dropdown-item"]`).getByText("Accessories"), "Пункт меню 'Accessories'")
    }

    get clothesMenuButton(): Button {
        return new Button(this.page.locator(`[class="dropdown-item"]`).getByText("Clothes"), "Пункт меню 'Clothes'")
    }

    get womenClothesSubmenuButton(): Button {
        return new Button(this.page.locator(`[class="dropdown-item dropdown-submenu"]`).getByText("Women"), "Подкатегория 'Women' для меню 'Clothes'")
    }

    get searchItemInput(): Input {
        return new Input(this.page.locator("[placeholder='Search our catalog']"), "Поле ввода поиска товаров по названию")
    }

    get carouselSampleMenuButton(): Button {
        return new Button(this.page.locator('[id="carousel"]'), "Карусель, отображающая образцы товаров")
    }

    get firstCarouselSample(): Button {
        return new Button(this.page.getByText("Sample 1"), "Первый образец из карусели")
    }

    get secondCarouselSample(): Button {
        return new Button(this.page.getByText("Sample 2"), "Второй образец из карусели")
    }

    get thirdCarouselSample(): Button {
        return new Button(this.page.getByText("Sample 3"), "Третий образец из карусели")
    }

    get carouselControlPreviousIconButton(): Button {
        return new Button(this.page.locator('[class*="icon-prev"]'), "Левая стрелка на карусели, отображающей образцы товаров")
    }

    get carouselControlNextIconButton(): Button {
        return new Button(this.page.locator('[class="icon-next"]'), "Правая стрелка на карусели, отображающей образцы товаров")
    }

    get firstPopularProductButton(): Button {
        return new Button(this.page.locator('[class*="product-thumbnail"]').first(), "Первая карточка в секции популярных товаров")
    }

    get firstQuickViewPanel(): Button {
        return new Button(this.page.locator('[class*="quick-view"]').first(), "Панель Quick View для первой карточки в секции популярных товаров")
    }

    get firstWishlistButton(): Button {
        return new Button(this.page.locator('[class="wishlist-button-add"]').first(), "Кнопка добавления в избранное для первой карточки в секции популярных товаров")
    }

    get signInNotificationButton(): Button {
        return new Button(this.page.locator('[class="btn btn-primary"]').getByText('Sign in'), "Кнопка регистрации на уведомлении о необходимости регистрации при добавлении товара в избранное")
    }

    get subscriptionEmailInput(): Input {
        return new Input(this.page.locator('[class="input-wrapper"]').getByPlaceholder("Your email address"), "Поле ввода почты для подписки на рассылку")
    }

    get subscribeButton(): Button {
        return new Button(this.page.locator('[class*="btn"]').getByText('Subscribe'), "Кнопка Subscribe")
    }

    get subscriptionConfirmationAlert(): Block {
        return new Block(this.page.locator('[class*="alert-success"]').getByText('You have successfully subscribed to this newsletter.'), "Оповещение об успешной подписке на рассылку")
    }

    get subscriptionDenialAlert(): Block {
        return new Block(this.page.locator('[class*="alert-danger"]').getByText('Invalid email address'), "Оповещение о некорректном емейле")
    }

    get quickProductSearchResultMenu(): Button {
        return new Button(this.page.locator('[class*="searchbar-autocomplete"]'), "Выпадающее меню с результатами поиска товара")
    }

    get quickProductSearchResultFirstMenuItem():Button {
        return new Button(this.page.locator('[class="product"]').first(), "Первый найденнный товар из выпадающего меню с результатами поиска товара")
    }

    get signInButton(): Button {
        return new Button(this.page.locator('[class="hidden-sm-down"]').getByText('Sign In'), "Кнопка Sign in на главной странице")
    }

    get signOutButton(): Button {
        return new Button(this.page.locator('[class*="logout"]'), "Кнопка Sign out на главной странице")
    }

    accountNameButton(accountName: string): Button {
        return new Button(this.page.locator('[class="account"]').getByText(accountName), "Кнопка имени аккаунта на главной странице")
    }

    async open(): Promise<void> {
        await this.page.goto(this.baseURL, {waitUntil: "domcontentloaded"});
    }
}
