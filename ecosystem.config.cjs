module.exports = {
  apps: [{
    name: 'discord-film-bot',
    script: './dist/index.js',
    node_args: '-r esm'
  }]
}
