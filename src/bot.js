const { GatewayIntentBits } = require("discord.js");
const Discord = require("discord.js");
const {getCommand} = require("./utils");

const prefix = '!';
const commands = {
    find: require('./commands/FindCommand')
};


const activateBot = async (token, handler) => {
    const bot = new Discord.Client();
    await bot.login(token);
    handler(bot);
};

const useCommands = async (bot) => {
    bot.on("message", async (message) => {
        if (message.author.bot || !message.channel.name.includes('фильмы')) return;

        if (message.content.includes(prefix)) {
            const [command, value] = getCommand(message.content);
            try {
                await commands[command](message, value);
            } catch (e) {
                console.log('Команда не найдена');
            }
        } else if (Number(message.content)) {
            await require('./commands/FilmIdCommand')(message);
        }
    });
}

module.exports = {
    activateBot,
    useCommands
};
