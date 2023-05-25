FROM node:16

# Create the bot's directory
RUN mkdir -p /usr/src/discord-film-bot
WORKDIR /usr/src/discord-film-bot

COPY package.json /usr/src/discord-film-bot
RUN npm install

COPY . /usr/src/discord-film-bot

# Build project
RUN npm run build

# Start the bot.
CMD ["npm", "run", "start"]