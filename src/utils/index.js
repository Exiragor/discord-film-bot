module.exports.getFilmLink = async (page, cite, title) => {
    await page.goto(`https://www.google.com/search?q=${cite}+${title}`);
    return await page.evaluate(([cite, title]) => {
        console.log(cite, title);
        const search = document.querySelector('#search');
        const blocks = Array.from(search.querySelectorAll('div.g'));
        const film = blocks.find((block) =>
            block.querySelector('cite').textContent.includes(cite)
            &&
            block.querySelector('h3').textContent.includes(title)
        );
        return film ? film.querySelector('a').href : null;
    }, [cite, title]);
}
