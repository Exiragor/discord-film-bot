const puppeteer = require('puppeteer');

module.exports.filmCites = ['tabfilm', 'lordfilm', 'kinodrive'];

module.exports.getFilmLink = async (page, cite, title) => {
    await page.goto(`https://www.google.com/search?q=${cite}+${title}`);
    const blocks = Array.from(await page.$$('#search div.g'));
    const film = blocks.find(async (block) => {
        const citeEl = await page.evaluate(el => el.textContent, await block.$('cite'));
        const titleEl = await page.evaluate(el => el.textContent, await block.$('h3'));

        return citeEl.includes(cite) && titleEl.includes(title)
    });
    if (!film) return null;
    const link = await film.$('a');
    await link.click();
    await page.waitForNavigation();
    return await page.url();
}

module.exports.initChrome = async () => {
    const browser = await puppeteer.launch();
    return [browser, await browser.newPage()];
}

module.exports.closeAction = (browser, message) => {
    message.delete();
    browser.close();
}

module.exports.getCommand = (str) => {
    const [command, ...values] = str.substring(1).split(' ');
    return [command, values.join(' ')];
}
