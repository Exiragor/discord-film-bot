const config = require('config');

const {activateBot, useCommand} = require('./bot');

activateBot(config.get('BOT_TOKEN'), async (bot) => {
    // await useCommand(bot, 'filmId');
});

require('./Commands/FilmIdCommand')();
