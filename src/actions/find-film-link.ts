export async function findFilmLink(page: any, cite: string, title: string) {
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