import { Browser, BrowserContext, Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class AuthInit extends BasePage {
    context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        super(page);
        this.context = context;
    }

    get currentPage(): Page {
        return this.page;
    }

    static async create(browser: Browser): Promise<AuthInit> {
        const context = await browser.newContext();
        /* remove request for/about appearing of advertisement_popUp  */
        await context.route(/api.mindbox.ru\/js\/byendpoint\/sbereducation-website.js/, route => route.abort());
        const page = await context.newPage();
        return new AuthInit(page, context);
    }
}
