import {test} from '../../fixtures/uk-store/store.fixtures';

test.describe('Проверка навигации', () => {
    test.afterEach(async ({storeMainPage}) => {
        await storeMainPage.page.context().clearCookies();
    });

    test('Кнопка Account работает на панели навигации', async ({storeMainPage, loginPage}) => {
        await storeMainPage.open()
        await storeMainPage.navBar.isVisible()
        await storeMainPage.accountTopMenuButton.click()
        await loginPage.accountLoginHeader.isVisible()
    });

    test('Кнопка Specials работает на панели навигации', async ({storeMainPage, specialPage}) => {
        await storeMainPage.open()
        await storeMainPage.navBar.isVisible()
        await storeMainPage.specialsTopMenuButton.click()
        await specialPage.specialOffersHeader.isVisible()
    });

    test('Кнопка Cart работает на панели навигации', async ({storeMainPage, cartPage}) => {
        await storeMainPage.open()
        await storeMainPage.navBar.isVisible()
        await storeMainPage.cartTopMenuButton.click()
        await cartPage.shoppingCartHeader.isVisible()
        await searchResultsPage.isVisible()
    });
});



