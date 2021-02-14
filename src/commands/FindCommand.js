const {getFilmLink, initChrome, closeAction, filmCites} = require("../utils");


const FindCommand = async (message, value) => {
    const [browser, page] = await initChrome();

    for (const cite of filmCites) {
        try {
            const botMsg = await message.channel.send(await getFilmLink(page, cite, value));
            botMsg.delete({ timeout: 600000 });
        } catch (e) {
            console.log('Фильм не найден');
        }
    }

    closeAction(browser, message);
}

module.exports = FindCommand;
