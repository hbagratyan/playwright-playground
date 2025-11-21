import {test} from '../../fixtures/uk-store/store.fixtures';
import {expect} from "@playwright/test";

test.describe('Проверка поиска товаров', () => {
    test.afterEach(async ({storeMainPage}) => {
        await storeMainPage.page.context().clearCookies();
    });

    test('Вввод названия товара в поле поиска и выпадение меню результатов поиска', async ({storeMainPage}) => {
        const itemName = 'Mug'
        await storeMainPage.open()
        await storeMainPage.searchItemInput.fill(itemName)
        await storeMainPage.quickProductSearchResultMenu.isVisible()
        await expect(storeMainPage.quickProductSearchResultFirstMenuItem.getLocator).toContainText(itemName, {ignoreCase: true})
    })

    test('Поиск товара по названию и просмотр релевантных результатов поиска', async ({storeMainPage, searchResultsPage }) => {
        const itemName = 'Mug'
        await storeMainPage.open()
        await storeMainPage.searchItemInput.fill(itemName)
        await storeMainPage.searchItemInput.pressEnter()
        await expect(searchResultsPage.nthProductTitle(1).getLocator).toContainText(itemName, {ignoreCase: true})
    })

    test('Пустое поле поиска товара и просмотр страницы с отсутствием совпадений', async ({storeMainPage, searchResultsPage }) => {
        await storeMainPage.open()
        await storeMainPage.searchItemInput.pressEnter()
        await searchResultsPage.noMatchesFoundHeader.isVisible()
    })

    test('Поиск отсутствующего товара по названию и просмотр страницы с с отсутствием совпадений', async ({storeMainPage, searchResultsPage }) => {
        const itemNameIrrelevant = 'Rurururururu'
        await storeMainPage.open()
        await storeMainPage.searchItemInput.fill(itemNameIrrelevant)
        await storeMainPage.searchItemInput.pressEnter()
        await searchResultsPage.noMatchesFoundHeader.isVisible()
    })

    test('Поиск товара по имени и сортировка найденных результатов по алфавиту', async ({storeMainPage, searchResultsPage }) => {
        const itemName = 'Mug';
        await storeMainPage.open();
        await storeMainPage.searchItemInput.fill(itemName)
        await storeMainPage.searchItemInput.pressEnter()
        await searchResultsPage.page.waitForLoadState('networkidle')
        await searchResultsPage.sortOrderDropdown.click()
        await searchResultsPage.sortAtoZ.waitForVisibility()
        await Promise.all([
            searchResultsPage.page.waitForResponse(resp => resp.url().includes('product.name.asc') && resp.status() === 200),
            searchResultsPage.sortAtoZ.click()
        ]);
        const names = await searchResultsPage.productTitles.allTextContents();
        expect(names).toEqual([...names].sort());
    })
});




