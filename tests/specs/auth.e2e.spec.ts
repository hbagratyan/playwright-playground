import {test} from '../fixtures/store/store.fixtures';

test.describe('Общая проверка', () => {
    test.afterEach(async ({storeMainPage}) => {
        await storeMainPage.page.context().clearCookies();
    });

    test('Логотип отображается', async ({storeMainPage}) => {
        await storeMainPage.open()
        await storeMainPage.mainLogo.isVisible()
    });

    test('Панель навигации отображается', async ({storeMainPage}) => {
        await storeMainPage.open()
        await storeMainPage.navBar.isVisible()
    });

    test('Поиск товара в поле поиска и переход на страницу товара', async ({storeMainPage, productPage}) => {
        const itemName = 'Acqua Di Gio Pour Homme'
        await storeMainPage.open()
        await storeMainPage.searchItemInput.fill(itemName)
        await storeMainPage.page.keyboard.press('Enter')
        await productPage.descriptionTabHeader.isVisible()
    })
});



