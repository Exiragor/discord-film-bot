import config from 'config';
import { BotConfig } from '../types/config';

const {filmCites} = config.get<BotConfig>('bot');

export async function findFilmLink(page: any, title: string) {
    // search film links
    const cites = ['lordfilm', 'filmhd1080'];
    const links = [];
    for (const cite of filmCites) {
        links.push(await getFilmLink(page, cite, title));
    }
    return links.filter(Boolean).reduce((acc, curr) => acc + `${curr} \n`, '');
}

export async function getFilmLink(page: any, cite: string, title: string) {
    await page.goto(`https://www.google.com/search?q=${cite}+${title}`);
    const blocks = Array.from<any>(await page.$$('#search div.g'));
    const film = blocks.find(async (block: any) => {
        const citeEl = await page.evaluate((el: any) => el.textContent, await block.$('cite'));
        const titleEl = await page.evaluate((el: any) => el.textContent, await block.$('h3'));

        return citeEl.includes(cite) && titleEl.includes(title)
    });
    if (!film) return null;
    const link = await film.$('a');
    await link.click();
    await page.waitForNavigation();
    return await page.url();
}