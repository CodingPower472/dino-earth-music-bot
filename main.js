
const Discord = require('discord.js');

const config = require('./config');

const bot = new Discord.Client();
const channelId = config.channelId;

function playAnthem(channel) {
    console.log('Play anthem');
    channel.leave();
    channel.join().then(connection => {
        const dispatcher = connection.playFile('./anthem.mp3');
        dispatcher.on('end', () => {
            playAnthem(channel);
        });
    });
}

bot.on('ready', () => {
    console.log('Bot ready');
    const channel = bot.channels.get(channelId);
    if (!channel) console.error(`Failed to load channel with id: ${channelId}`);
    channel.leave();
    playAnthem(channel);
});

bot.login(config.botToken);
