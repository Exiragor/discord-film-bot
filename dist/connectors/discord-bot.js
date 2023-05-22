import { Client } from 'discord.js';
export class DiscordBot {
    constructor(token) {
        this.client = new Client();
        // init
        this.client.login(token).catch(console.error);
    }
    register(event, handler) {
        this.client.on(event, (...args) => {
            try {
                void handler(...args);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
