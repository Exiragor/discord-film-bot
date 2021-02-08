const puppeteer = require('puppeteer');
const {getFilmLink} = require("../utils");

const FilmIdCommand = async (message) => {
    if (message.author.bot || !Number(message.content)) return;

    if (message.channel.name.includes('фильмы')) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.google.com/search?q=kinopoisk+${message.content}`);
        // get film info
        const { title, url } = await page.evaluate(() => {
            const search = document.querySelector('#search');
            const blocks = Array.from(search.querySelectorAll('div.g'));
            const film = blocks.find((block) => block.querySelector('cite').textContent.includes('film'));
            if (!film) return {};

            const [title] = film.querySelector('h3').textContent.split(' –');
            const url = film.querySelector('a').href;

            return {
                title,
                url
            }
        });

        if (!title || !url) {
            message.channel.send('Фильм не найден!');
            return;
        }

        const [span] = await page.$x("//span[contains(., 'Рейтинг')]");
        const rating = await page.evaluate(el => el.textContent, span);

        const [btn] = await page.$x("//a[contains(., 'Картинки')]");
        await btn.click();
        await page.waitForNavigation();
        await page.waitForSelector('#islmp');
        await page.click("#islmp a");
        await page.waitForSelector('#islsp');
        await page.waitForTimeout(500);

        const image = await page.evaluate(() => {
            return document.querySelector('#islsp').querySelector('img').src;
        });

        // search film links
        const cites = ['tabfilm', 'lordfilm', 'kinodrive'];
        const links = [];
        for (const cite of cites) {
            links.push(await getFilmLink(page, cite, title));
        }
        const linksStr = links.filter(Boolean).reduce((acc, curr) => acc + `${curr} \n`, '');

        const description = `
            ${url}
            ${rating}
            
            ${links.length ? 'Смотреть тут:' : ''}
            ${linksStr}
        `;

        // send film to discord
        await message.channel.send({
            embed: {
                title,
                url,
                description,
                thumbnail: {
                    url: image || '',
                }
            }
        });
        await message.delete();
        browser.close();
    }
}

module.exports = FilmIdCommand;
