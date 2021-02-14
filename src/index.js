const config = require('config');

const {activateBot, useCommands} = require('./bot');

activateBot(config.get('BOT_TOKEN'), async (bot) => {
    await useCommands(bot);
});
