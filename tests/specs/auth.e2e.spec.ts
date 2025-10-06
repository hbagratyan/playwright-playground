import {test} from '../fixtures/auth/auth.fixtures';

test.describe('Общая проверка', () => {
    test.afterEach(async ({storeMainPage}) => {
        await storeMainPage.page.context().clearCookies();
    });

    test('Ввод корректных логина и пароля пользователя', async ({storeMainPage}) => {
        await storeMainPage.open();
        await storeMainPage.mainLogo.isVisible()
    });
});

