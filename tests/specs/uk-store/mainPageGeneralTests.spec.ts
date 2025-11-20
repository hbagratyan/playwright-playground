import {test} from '../../fixtures/uk-store/store.fixtures';
import {EmailGenerator} from "../../utils/general.helper";
import {expect} from "@playwright/test";

test.describe('Общая проверка', () => {
    test.afterEach(async ({storeMainPage}) => {
        await storeMainPage.page.context().clearCookies();
    });

    test('Логотип отображается', async ({storeMainPage}) => {
        await storeMainPage.open()
        await storeMainPage.mainLogo.isVisible()
    });

    test('Панель с категориями товаров отображается', async ({storeMainPage}) => {
        await storeMainPage.open()
        await storeMainPage.productCategoryBar.isVisible()
    });

    test('Наведение курсора на категорию товара Clothes вызывает сабменю с подкатегориями', async ({storeMainPage}) => {
        await storeMainPage.open()
        await storeMainPage.clothesMenuButton.hover()
        await storeMainPage.womenClothesSubmenuButton.isVisible()
    });

    test('Меню с образцами товаров отображается и скроллится', async ({storeMainPage}) => {
        await storeMainPage.open()
        await storeMainPage.carouselSampleMenuButton.isVisible()
        await storeMainPage.firstCarouselSample.isVisible()
        await storeMainPage.carouselControlNextIconButton.click()
        await storeMainPage.secondCarouselSample.isVisible()
        await storeMainPage.carouselControlNextIconButton.click()
        await storeMainPage.thirdCarouselSample.isVisible()
        await storeMainPage.carouselControlPreviousIconButton.click()
        await storeMainPage.secondCarouselSample.isVisible()
        await storeMainPage.carouselControlPreviousIconButton.click()
        await storeMainPage.firstCarouselSample.isVisible()
    });

    test('Панель Quick View открывается при наведении курсора на карточку популярного товара', async ({storeMainPage}) => {
        await storeMainPage.open()
        await storeMainPage.firstPopularProductButton.hover()
        await storeMainPage.firstQuickViewPanel.isVisible()
    });

    test('Подписка на рассылку при введении валидной почты и клику на кнопку Subscribe', async ({storeMainPage}) => {
        await storeMainPage.open()
        await storeMainPage.subscriptionEmailInput.scrollToElementIfNeeded()
        await storeMainPage.subscriptionEmailInput.fill(EmailGenerator.generateRandomEmail())
        await storeMainPage.subscribeButton.click()
        await storeMainPage.subscriptionConfirmationAlert.isVisible()
    });

    test('Сообщение об ошибке при введении невалидной почты и клику на кнопку Subscribe', async ({storeMainPage}) => {
        await storeMainPage.open()
        await storeMainPage.subscriptionEmailInput.scrollToElementIfNeeded()
        await storeMainPage.subscriptionEmailInput.fill(EmailGenerator.generateInvalidEmail())
        await storeMainPage.subscribeButton.click()
        await storeMainPage.subscriptionDenialAlert.isVisible()
    });

    test('Уведомление о необходимости ввести почту после клика на кнопку Subscribe', async ({storeMainPage}) => {
        const validationMessage = "Please fill in this field."
        await storeMainPage.open()
        await storeMainPage.subscribeButton.click()
        const validationMsg = await storeMainPage.subscriptionEmailInput.evaluate(
            (el) => (el as HTMLInputElement).validationMessage)

        console.log(validationMsg)
        expect(validationMsg).toContain(validationMessage)
    });
});

test('Уведомление о необходимости регистрации появляется при попытки добавить товар в избранное без авторизации', async ({storeMainPage}) => {
    await storeMainPage.open()
    await storeMainPage.firstWishlistButton.click()
    await storeMainPage.signInNotificationButton.isVisible()
});






