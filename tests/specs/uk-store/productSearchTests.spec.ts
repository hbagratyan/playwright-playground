import {test} from '../../fixtures/uk-store/store.fixtures';

test.describe('Общая проверка', () => {
    test.afterEach(async ({storeMainPage}) => {
        await storeMainPage.page.context().clearCookies();
    });


    test.fixme('Поиск товара в поле поиска и переход на страницу товара', async ({storeMainPage, productPage}) => {
        //TODO переписать под новый магаз
        const itemName = 'Acqua Di Gio Pour Homme'
        await storeMainPage.open()
        await storeMainPage.searchItemInput.fill(itemName)
        await storeMainPage.page.keyboard.press('Enter')
        await productPage.descriptionTabHeader.isVisible()
    })
});



