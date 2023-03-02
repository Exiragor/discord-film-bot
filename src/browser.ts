import puppeteer from 'puppeteer';

export async function initBrowser() {
    const browser = await puppeteer.launch(
        {headless: true, args:['--no-sandbox']}
    );

    const page = await browser.newPage();

    return [browser, page];
}