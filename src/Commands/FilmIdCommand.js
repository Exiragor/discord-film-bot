const { JSDOM } = require("jsdom");
const puppeteer = require('puppeteer');

const FilmIdCommand = async (message) => {
    if (message.author.bot || !Number(message.content)) return;

    if (message.channel.name.includes('фильмы')) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.google.com/search?q=kinopoisk+${message.content}`);
        let html = await page.content();

        const search = new JSDOM(html).window.document.querySelector('#search');
        const blocks = Array.from(search.querySelectorAll('div.g'));
        const film = blocks.find((block) => block.querySelector('cite').textContent.includes('film'));
        if (!film) return;

        const [title] = film.querySelector('h3').textContent.split(' –');
        const url = film.querySelector('a').href;

        const [btn] = await page.$x("//a[contains(., 'Картинки')]");
        await btn.click();
        await page.waitForNavigation();
        await page.waitForSelector('#islmp');
        await page.click("#islmp a");
        await page.waitForSelector('#islsp');
        await page.waitForTimeout(500);

        html = await page.content();
        const lsp = new JSDOM(html).window.document.querySelector('#islsp');
        const image = lsp.querySelector('img').src;

        await message.channel.send({
            embed: {
                title,
                url,
                description: url,
                thumbnail: {
                    url: image,
                }
            }
        });
        await message.delete();
        browser.close();
    }
}

module.exports = FilmIdCommand;
