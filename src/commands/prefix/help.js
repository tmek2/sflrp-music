const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['commands', 'h'],
    description: 'Show all available commands',
    usage: 'help',
    
    async execute(message) {
        const prefix = message.client.config.prefix;
        const { E } = require('../../utils/emojis');
        
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${E.MUSIC} Music Bot Commands`)
            .setDescription('Here are all the available commands for the music bot:')
            .addFields(
                {
                    name: `${E.MUSIC} Music Commands (Prefix)`,
                    value: [
                        `\`${prefix}play <query>\` - Play a song or playlist`,
                        `\`${prefix}pause\` - Pause or resume the current song`,
                        `\`${prefix}skip\` - Skip the current song`,
                        `\`${prefix}stop\` - Stop music and clear queue`,
                        `\`${prefix}np\` - Show current song info`,
                        `\`${prefix}queue [page]\` - Show the music queue`,
                        `\`${prefix}volume [level]\` - Set or check volume (1-100)`,
                        `\`${prefix}loop [mode]\` - Set loop mode (off/track/queue)`,
                        `\`${prefix}shuffle\` - Shuffle the queue`
                    ].join('\n'),
                    inline: false
                },
                {
                    name: `${E.MUSIC} Music Commands (Slash)`,
                    value: [
                        '`/play <query>` - Play a song or playlist',
                        '`/pause` - Pause or resume the current song',
                        '`/skip` - Skip the current song',
                        '`/stop` - Stop music and clear queue',
                        '`/nowplaying` - Show current song info',
                        '`/queue [page]` - Show the music queue',
                        '`/volume [level]` - Set or check volume (1-100)',
                        '`/loop <mode>` - Set loop mode (off/track/queue)',
                        '`/shuffle` - Shuffle the queue'
                    ].join('\n'),
                    inline: false
                },
                {
                    name: '🎛️ Music Controls',
                    value: `Use the buttons below music messages for quick controls:\n${E.BUTTON_PAUSE} Pause/Resume | ${E.BUTTON_SKIP} Skip | ${E.BUTTON_STOP} Stop | ${E.BUTTON_SHUFFLE} Shuffle | ${E.BUTTON_LOOP} Loop`,
                    inline: false
                },
                {
                    name: `${E.QUEUE} Supported Sources`,
                    value: `${E.PROGRESS_DOT} YouTube\n${E.PROGRESS_DOT} YouTube Music\n${E.PROGRESS_DOT} Spotify (tracks only)\n${E.PROGRESS_DOT} SoundCloud\n${E.PROGRESS_DOT} Direct URLs`,
                    inline: false
                }
            )
            .setFooter({
                text: `Prefix: ${prefix} | Use slash commands (/) for better experience!`
            })
            .setTimestamp();
        
        await message.reply({ embeds: [embed] });
    },
};