import {test} from '../fixtures/store/store.fixtures';

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
});



