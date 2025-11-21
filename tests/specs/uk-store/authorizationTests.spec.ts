import {test} from '../../fixtures/uk-store/store.fixtures';
import {EmailGenerator} from "../../utils/email.helper";
import {NameGenerator} from "../../utils/username.helper";
import {PasswordGenerator} from "../../utils/password.helper";
import {BirthdateGenerator} from "../../utils/birthdate.helper";
import {expect} from "@playwright/test";

test.describe('Проверка авторизации пользователя', () => {
    test.afterEach(async ({storeMainPage}) => {
        await storeMainPage.page.context().clearCookies();
    });

    test('Пользователь логинится после ввода корректных данных', async ({storeMainPage, signInPage}) => {
        const email = 'harry.bagratyan@yandex.com';
        const password = 'test123';
        await storeMainPage.open()
        await storeMainPage.signInButton.click()
        await signInPage.logInToYourAccountHeader.isVisible()
        await signInPage.emailInputField.fill(email)
        await signInPage.passwordInputField.fill(password)
        await signInPage.signInButton.click()
        await storeMainPage.signOutButton.isVisible()
    });

    test('Вкладка аккаунт доступна после авторизации', async ({storeMainPage, signInPage, myAccountPage}) => {
        const email = 'harry.bagratyan@yandex.com';
        const password = 'test123';
        await storeMainPage.open()
        await storeMainPage.signInButton.click()
        await signInPage.logInToYourAccountHeader.isVisible()
        await signInPage.emailInputField.fill(email)
        await signInPage.passwordInputField.fill(password)
        await signInPage.signInButton.click()
        await Promise.all([
              myAccountPage.page.waitForResponse(resp => resp.url().includes('account') && resp.status() === 200),
              storeMainPage.accountNameButton("Test  Testovich").click()
              ]);
        await myAccountPage.yourAccountHeader.isVisible()
    });

    test('Аутентификация не срабатывает после ввода некорректных данных', async ({storeMainPage, signInPage}) => {
        const email = 'harry123.bagratyan@yandex.com';
        const password = 'test1234';
        await storeMainPage.open()
        await storeMainPage.signInButton.click()
        await signInPage.logInToYourAccountHeader.isVisible()
        await signInPage.emailInputField.fill(email)
        await signInPage.passwordInputField.fill(password)
        await signInPage.signInButton.click()
        await signInPage.authenticationFailedNotification.isVisible()
    });

    test('Аутентификация не срабатывает без ввода данных', async ({storeMainPage, signInPage}) => {
        const validationMessage = "Please fill in this field."
        await storeMainPage.open()
        await storeMainPage.signInButton.click()
        await signInPage.logInToYourAccountHeader.isVisible()
        await signInPage.signInButton.click()
        const validationMsg = await signInPage.emailInputField.evaluate(
            (el) => (el as HTMLInputElement).validationMessage)
        await signInPage.authenticationFailedNotification.isVisible()
        console.log(validationMsg)
        expect(validationMsg).toContain(validationMessage)
    });

    test('Пользователь разлогинивается после нажатия кнопки Sign Out', async ({storeMainPage, signInPage}) => {
        const email = 'harry.bagratyan@yandex.com';
        const password = 'test123';
        await storeMainPage.open()
        await storeMainPage.signInButton.click()
        await signInPage.logInToYourAccountHeader.isVisible()
        await signInPage.emailInputField.fill(email)
        await signInPage.passwordInputField.fill(password)
        await signInPage.signInButton.click()
        await storeMainPage.signOutButton.click()
        await storeMainPage.signInButton.isVisible()
    });

    test('Новый пользователь создается после ввода валидных данных при создании аккаунта', async ({storeMainPage, signInPage, createAccountPage, myAccountPage}) => {
        await storeMainPage.open()
        await storeMainPage.signInButton.click()
        await signInPage.accountRegistrationLink.click()
        await createAccountPage.createAccountHeader.isVisible()
        await createAccountPage.femaleGenderRadioButton.click()
        const firstName = NameGenerator.generateFirstName()
        await createAccountPage.firstNameInputField.fill(firstName)
        console.log(firstName);
        const lastName = NameGenerator.generateLastName()
        await createAccountPage.lastNameInputField.fill(lastName)
        console.log(lastName);
        const email = EmailGenerator.generateRandomEmail()
        await createAccountPage.emailInputField.fill(email)
        console.log(email)
        const password = PasswordGenerator.generateRandomPassword()
        await createAccountPage.passwordInputField.fill(password)
        console.log(password)
        await createAccountPage.showPasswordButton.click()
        await createAccountPage.visiblePasswordInput.isVisible()
        const birthdate = BirthdateGenerator.generateBirthdate()
        await createAccountPage.birthdayInputField.fill(birthdate)
        await createAccountPage.receiveOffersButton.click()
        await createAccountPage.agreeToTermsButton.click()
        await createAccountPage.signUpForNewsletterButton.click()
        await createAccountPage.saveNewAccountButton.click()
        await storeMainPage.signOutButton.isVisible()
        await Promise.all([
            myAccountPage.page.waitForResponse(resp => resp.url().includes('account') && resp.status() === 200),
            await storeMainPage.accountNameButton(firstName + " " + lastName).click()
        ])
        await myAccountPage.yourAccountHeader.isVisible()
    });

    test('Новый пользователь с уже существующим емейлом не создается', async ({storeMainPage, signInPage, createAccountPage}) => {
        await storeMainPage.open()
        await storeMainPage.signInButton.click()
        await signInPage.accountRegistrationLink.click()
        await createAccountPage.createAccountHeader.isVisible()
        await createAccountPage.femaleGenderRadioButton.click()
        const firstName = NameGenerator.generateFirstName()
        await createAccountPage.firstNameInputField.fill(firstName)
        console.log(firstName);
        const lastName = NameGenerator.generateLastName()
        await createAccountPage.lastNameInputField.fill(lastName)
        console.log(lastName);
        const email = 'harry.bagratyan@yandex.com';
        await createAccountPage.emailInputField.fill(email)
        console.log(email)
        const password = PasswordGenerator.generateRandomPassword()
        await createAccountPage.passwordInputField.fill(password)
        console.log(password)
        const birthdate = BirthdateGenerator.generateBirthdate()
        await createAccountPage.birthdayInputField.fill(birthdate)
        await createAccountPage.receiveOffersButton.click()
        await createAccountPage.agreeToTermsButton.click()
        await createAccountPage.signUpForNewsletterButton.click()
        await createAccountPage.saveNewAccountButton.click()
        await createAccountPage.emailAlreadyUsedNotification.isVisible()
    });
});








