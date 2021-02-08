const puppeteer = require('puppeteer');
const {getFilmLink} = require("../utils");

const FilmIdCommand = async (message) => {
    // if (message.author.bot || !Number(message.content)) return;

    // if (message.channel.name.includes('фильмы')) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.google.com/search?q=kinopoisk+${965754}`);
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
        let links = [];
        // links = links.map((link) => {
        //     return getFilmLink(page, link, title);
        // });
        // links = await Promise.all([
        //     getFilm(page, 'tabfilm', title),
        //     getFilm(page, 'lordfilm', title),
        //     getFilm(page, 'kinodrive', title),
        // ]);
        links.push(await getFilm(page, 'tabfilm', title));
        links.push(await getFilm(page, 'lordfilm', title));
        links.push(await getFilm(page, 'kinodrive', title));
        console.log(links);
        links = links.filter(Boolean);
        const linksStr = links.reduce((acc, curr) => acc + `${curr} \n`, '');

        const description = `
            ${url}
            ${rating}
            
            ${links.length ? 'Смотреть тут:' : ''}
            ${linksStr}
        `;

        //send film to discord
        // await message.channel.send({
        //     embed: {
        //         title,
        //         url,
        //         description,
        //         thumbnail: {
        //             url: image || '',
        //         }
        //     }
        // });
        // await message.delete();
        browser.close();
    // }
}

const getFilm = async (page, cite, title) => {
    await page.goto(`https://www.google.com/search?q=${cite}+${title}`);
    const blocks = Array.from(page.$$('#search div.g'));
    const film = blocks.find((block) =>
        block.querySelector('cite').textContent.includes(cite)
        &&
        block.querySelector('h3').textContent.includes(title)
    );
    if (!film) return null;

    console.log(film);
    await film.click();
    await page.waitForNavigation();
    return await page.url();
}

module.exports = FilmIdCommand;
