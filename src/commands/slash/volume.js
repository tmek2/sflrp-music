const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Set or check the music volume')
        .addIntegerOption(option =>
            option.setName('level')
                .setDescription('Volume level (1-100)')
                .setMinValue(1)
                .setMaxValue(100)),
    
    async execute(interaction) {
        const player = interaction.client.kazagumo.players.get(interaction.guildId);
        const member = interaction.member;
        const volumeLevel = interaction.options.getInteger('level');
        
        if (!player) {
            const { E } = require('../../utils/emojis');
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription(`${E.ERROR} No music player found!`)],
                ephemeral: true
            });
        }
        
        // If no volume level provided, show current volume
        if (!volumeLevel) {
            const { volumeEmoji } = require('../../utils/emojis');
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`${volumeEmoji(player.volume)} Current Volume`)
                .setDescription(`Volume is set to **${player.volume}%**`)
                .setTimestamp();
            
            return interaction.reply({ embeds: [embed] });
        }
        
        // Check if user is in voice channel
        if (!member.voice.channel) {
            const { E } = require('../../utils/emojis');
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription(`${E.ERROR} You need to be in a voice channel to change volume!`)],
                ephemeral: true
            });
        }
        
        // Check if user is in the same voice channel as bot
        const botChannel = interaction.guild?.members?.me?.voice?.channel;
        if (botChannel && member.voice.channel.id !== botChannel.id) {
            const { E } = require('../../utils/emojis');
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription(`${E.ERROR} You need to be in the same voice channel as the bot!`)],
                ephemeral: true
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
                { name: `${E.ARTIST} Changed by`, value: interaction.user.toString(), inline: true }
            )
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    },
};