const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stop',
    aliases: ['disconnect', 'dc', 'leave'],
    description: 'Stop the music and clear the queue',
    usage: 'stop',
    voiceChannel: true,
    guildOnly: true,
    
    async execute(message) {
        const player = message.client.kazagumo.players.get(message.guildId);
        
        if (!player) {
            return message.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#ff0000')
            .setDescription(`${E.ERROR} No music player found!`)]
            });
        }
        
        const queueLength = player.queue.length;
        const currentTrack = player.current;
        
        player.destroy();
        
        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle(`${E.BUTTON_STOP} Music Stopped`)
            .setDescription('Stopped the music and cleared the queue')
            .addFields(
                { name: `${E.MUSIC} Last Track`, value: currentTrack?.title || 'None', inline: true },
                { name: `${E.QUEUE} Cleared Queue`, value: `${queueLength} song(s)`, inline: true },
                { name: `${E.ARTIST} Stopped by`, value: message.author.toString(), inline: true }
            )
            .setTimestamp();
        
        await message.reply({ embeds: [embed] });
    },
};
const { E } = require('../../utils/emojis');