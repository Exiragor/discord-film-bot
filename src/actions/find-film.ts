import { Film } from '../types/film';

export async function findFilm(page: any, id: number): Promise<Film> {
    await page.goto(`https://www.google.com/search?q=kinopoisk+${id}`);
    // get film info
    const { title, url } = await page.evaluate(() => {
        const search = document.querySelector('#search');
        const blocks = Array.from(search?.querySelectorAll('div.g') || []);
        const film = blocks.find((block) => block.querySelector('cite')?.textContent?.includes('film'));
        if (!film) return {};

        const [title] = film.querySelector('h3')?.textContent?.split(' -') || [''];
        const url = film.querySelector('a')?.href;

        return {
            title,
            url
        }
    });

    const [span] = await page.$x("//span[contains(., 'Рейтинг: ')]");
    const rating = await page.evaluate((el: any) => el.textContent, span);

    const [btn] = await page.$x("//a[contains(., 'Картинки')]");
    await btn.click();
    await page.waitForNavigation();
    await page.waitForSelector('#islrg');
    await page.click("#islrg a");
    await page.waitForSelector('#islsp');
    await page.waitForTimeout(500);

    const imageUrl = await page.evaluate(() => {
        return document.querySelector('#islsp')?.querySelector<HTMLImageElement>('a > img')?.src || '';
    });

    const description = `
        ${url}
        ${rating}
    `;

    return {
        title: title || '',
        url: url || '',
        imageUrl,
        description
    }
}