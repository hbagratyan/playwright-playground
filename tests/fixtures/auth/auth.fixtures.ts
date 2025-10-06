import { test as base } from '@playwright/test';
import { StoreMainPage } from '../../page-objects/store/auth/storeMainPage';
import {AuthInit} from "../../page-objects/store/auth/auth.init";

interface AuthFixtures {
    storeMainPage: StoreMainPage;
    authInit: AuthInit
}

export const test = base.extend<AuthFixtures>({
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
    }
});
