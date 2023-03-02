import {Client, ClientEvents} from 'discord.js';

export class Bot {
    private client = new Client();

    constructor(token: string) {
        // init
        this.client.login(token);
    }

    register<K extends keyof ClientEvents>(event: K, handler: (...args: ClientEvents[K]) => void) {
        this.client.on(event, (...args: ClientEvents[K]) => {
            try {
                handler(...args);
            } catch(e) {
                console.error(e);
            }
        });
    }
}