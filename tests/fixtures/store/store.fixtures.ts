import { test as base } from '@playwright/test';
import { StoreMainPage } from '../../page-objects/store/store/storeMainPage';
import {AuthInit} from "../../page-objects/store/store/auth.init";
import {ProductPage} from "../../page-objects/store/store/productPage";

interface StoreFixtures {
    storeMainPage: StoreMainPage;
    productPage: ProductPage;
    authInit: AuthInit
}

export const test = base.extend<StoreFixtures>({
    authInit: [
        async ({ browser }, use): Promise<void> => {
            const authInit = await AuthInit.create(browser);
            await use(authInit);
            await authInit.currentPage.close();
        },
        { auto: true },
    ],

    storeMainPage: async ({ authInit, baseURL }, use) => {
        await use(new StoreMainPage(authInit.page, baseURL || 'https://automationteststore.com'));
    },

    productPage: async ({ authInit, baseURL }, use) => {
        await use(new ProductPage(authInit.page, baseURL || ''));
    }
});
