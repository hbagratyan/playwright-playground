import {test as base} from '@playwright/test';
import {StoreMainPage} from '../../page-objects/uk-store/storeMainPage';
import {AuthInit} from "../../page-objects/uk-store/auth.init";
import {ProductPage} from "../../page-objects/uk-store/productPage";
import {LoginPage} from "../../page-objects/uk-store/loginPage";
import {SpecialPage} from "../../page-objects/uk-store/specialPage";
import {CartPage} from "../../page-objects/uk-store/cartPage";
import {SearchResultsPage} from "../../page-objects/uk-store/searchResultsPage";

interface StoreFixtures {
    storeMainPage: StoreMainPage;
    productPage: ProductPage;
    loginPage: LoginPage;
    specialPage: SpecialPage;
    cartPage: CartPage;
    authInit: AuthInit;
    searchResultsPage: SearchResultsPage;
}

export const test = base.extend<StoreFixtures>({
    authInit: [
        async ({browser}, use): Promise<void> => {
            const authInit = await AuthInit.create(browser);
            await use(authInit);
            await authInit.currentPage.close();
        },
        {auto: true},
    ],

    storeMainPage: async ({authInit, baseURL}, use) => {
        await use(new StoreMainPage(authInit.page, baseURL || 'https://teststore.automationtesting.co.uk'));
    },

    loginPage: async ({authInit, baseURL}, use) => {
        await use(new LoginPage(authInit.page, baseURL || 'https://teststore.automationtesting.co.uk'));
    },

    specialPage: async ({authInit, baseURL}, use) => {
        await use(new SpecialPage(authInit.page, baseURL || 'https://teststore.automationtesting.co.uk'));
    },

    cartPage: async ({authInit, baseURL}, use) => {
        await use(new CartPage(authInit.page, baseURL || 'https://teststore.automationtesting.co.uk'));
    },

    searchResultsPage: async ({authInit, baseURL}, use) => {
        await use(new SearchResultsPage(authInit.page, baseURL || ''));
    },

    productPage: async ({authInit, baseURL}, use) => {
        await use(new ProductPage(authInit.page, baseURL || ''));
    },
});