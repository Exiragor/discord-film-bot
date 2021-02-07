const { JSDOM } = require("jsdom");
const puppeteer = require('puppeteer');

const FilmIdCommand = async (message) => {
    // if (message.author.bot && !Number(message.content)) return;

    // if (message.channel.name.includes('фильмы')) {
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.goto(`https://www.google.com/search?q=kinopoisk+${673}`);
        let html = await page.content();
        await page.screenshot({ path: 'example.png'});

        const search = new JSDOM(html).window.document.querySelector('#search');
        const blocks = Array.from(search.querySelectorAll('div.g'));
        const film = blocks.find((block) => block.querySelector('cite').textContent.includes('film'));
        if (!film) return;

        const title = film.querySelector('h3').textContent.split(' –')[0];
        const url = film.querySelector('a').href;

        console.log(title);
        console.log(url);

        const [btn] = await page.$x("//a[contains(., 'Картинки')]");
        await btn.click();
        await page.waitForNavigation();
        await page.waitForSelector('#islmp');
        await page.waitForTimeout(500);
        await page.click("#islmp a");
        await page.waitForSelector('#islsp');
        await page.waitForTimeout(500);

        html = await page.content();
        const lsp = new JSDOM(html).window.document.querySelector('#islsp');
        const image = lsp.querySelector('img').src;


        console.log(image);

    //     await message.channel.send({
    //         embed: {
    //             title,
    //             url,
    //             description: url,
    //             image: {
    //                 url: image
    //             }
    //         }
    //     });
    //     await message.delete();
    //     browser.close();
    // }
}

module.exports = FilmIdCommand;
