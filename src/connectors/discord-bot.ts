import { Client, type ClientEvents } from 'discord.js'

export class DiscordBot {
  private readonly client = new Client()

  constructor (token: string) {
    // init
    this.client.login(token).catch(console.error)
  }

  register<K extends keyof ClientEvents>(event: K, handler: (...args: ClientEvents[K]) => Promise<void> | void): void {
    this.client.on(event, (...args: ClientEvents[K]) => {
      try {
        void handler(...args)
      } catch (e) {
        console.error(e)
      }
    })
  }
}
