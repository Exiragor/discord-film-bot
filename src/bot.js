const Discord = require("discord.js");

const commands = {
    filmId: require('./Commands/FilmIdCommand')
};

const activateBot = async (token, handler) => {
    const bot = new Discord.Client();
    await bot.login(token);
    handler(bot);
};

const useCommand = async (bot, name) => {
    bot.on("message", async (message) => {
        await commands[name](message);
    });
}

module.exports = {
    activateBot,
    useCommand
};
