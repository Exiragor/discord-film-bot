const {initChrome, closeAction} = require("../utils");

const FilmIdCommand = async (message) => {
    const [browser, page] = await initChrome();

    await page.goto(`https://www.google.com/search?q=kinopoisk+${message.content}`);
    // get film info
    const { title, url } = await page.evaluate(() => {
        const search = document.querySelector('#search');
        const blocks = Array.from(search.querySelectorAll('div.g'));
        const film = blocks.find((block) => block.querySelector('cite').textContent.includes('film'));
        if (!film) return {};

        const [title] = film.querySelector('h3').textContent.split(' -');
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

    const [span] = await page.$x("//span[contains(., 'Рейтинг: ')]");
    const rating = await page.evaluate(el => el.textContent, span);

    const [btn] = await page.$x("//a[contains(., 'Картинки')]");
    await btn.click();
    await page.waitForNavigation();
    await page.waitForSelector('#islrg');
    await page.click("#islrg a");
    await page.waitForSelector('#islsp');
    await page.waitForTimeout(500);

    const image = await page.evaluate(() => {
        return document.querySelector('#islsp').querySelector('a > img').src;
    });

    const description = `
        ${url}
        ${rating}
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

    closeAction(browser, message);
}

module.exports = FilmIdCommand;
