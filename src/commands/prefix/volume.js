const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'volume',
    aliases: ['vol', 'v'],
    description: 'Set or check the music volume',
    usage: 'volume [1-100]',
    voiceChannel: true,
    guildOnly: true,
    
    async execute(message, args) {
        const player = message.client.kazagumo.players.get(message.guildId);
        
        if (!player) {
            const { E } = require('../../utils/emojis');
            return message.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription(`${E.ERROR} No music player found!`)]
            });
        }
        
        // If no volume level provided, show current volume
        if (!args.length) {
            const { volumeEmoji } = require('../../utils/emojis');
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`${volumeEmoji(player.volume)} Current Volume`)
                .setDescription(`Volume is set to **${player.volume}%**`)
                .setTimestamp();
            
            return message.reply({ embeds: [embed] });
        }
        
        const volumeLevel = parseInt(args[0]);
        
        if (isNaN(volumeLevel) || volumeLevel < 1 || volumeLevel > 100) {
            const { E } = require('../../utils/emojis');
            return message.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription(`${E.ERROR} Please provide a valid volume level between 1 and 100!`)]
            });
        }
        
        const { E, volumeEmoji } = require('../../utils/emojis');
        const oldVolume = player.volume;
        player.setVolume(volumeLevel);
        
        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle(`${volumeEmoji(volumeLevel)} Volume Changed`)
            .setDescription(`Volume changed from **${oldVolume}%** to **${volumeLevel}%**`)
            .addFields(
                { name: `${E.ARTIST} Changed by`, value: message.author.toString(), inline: true }
            )
            .setTimestamp();
        
        await message.reply({ embeds: [embed] });
    },
};