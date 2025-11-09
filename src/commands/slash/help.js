const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show all available commands'),
    
    async execute(interaction) {
        const { E } = require('../../utils/emojis');
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${E.MUSIC} Music Bot Commands`)
            .setDescription('Here are all the available commands for the music bot:')
            .addFields(
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
                    name: `${E.MUSIC} Music Commands (Prefix)`,
                    value: [
                        '`sf!play <query>` - Play a song or playlist',
                        '`sf!pause` - Pause or resume the current song',
                        '`sf!skip` - Skip the current song',
                        '`sf!stop` - Stop music and clear queue',
                        '`sf!np` - Show current song info',
                        '`sf!queue [page]` - Show the music queue',
                        '`sf!volume [level]` - Set or check volume',
                        '`sf!loop [mode]` - Set loop mode',
                        '`sf!shuffle` - Shuffle the queue'
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
                text: `Prefix: ${interaction.client.config.prefix} | Use slash commands (/) for better experience!`
            })
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    },
};