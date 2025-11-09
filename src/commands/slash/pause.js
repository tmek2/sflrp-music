const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause or resume the current song'),
    
    async execute(interaction) {
        const player = interaction.client.kazagumo.players.get(interaction.guildId);
        const member = interaction.member;
        
        if (!player || !player.playing) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription(`${E.ERROR} No music is currently playing!`)],
                ephemeral: true
            });
        }
        
        // Check if user is in voice channel
        if (!member.voice.channel) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription(`${E.ERROR} You need to be in a voice channel to pause/resume music!`)],
                ephemeral: true
            });
        }
        
        // Check if user is in the same voice channel as bot
        const botChannel = interaction.guild?.members?.me?.voice?.channel;
        if (botChannel && member.voice.channel.id !== botChannel.id) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription(`${E.ERROR} You need to be in the same voice channel as the bot!`)],
                ephemeral: true
            });
        }
        
        const wasPaused = player.paused;
        player.pause(!wasPaused);
        
        const embed = new EmbedBuilder()
            .setColor(wasPaused ? '#00ff00' : '#ffaa00')
            .setTitle(wasPaused ? `${E.STATUS_PLAYING} Music Resumed` : `${E.STATUS_PAUSED} Music Paused`)
            .setDescription(`${wasPaused ? 'Resumed' : 'Paused'} **${player.current?.title || 'Unknown'}**`)
            .addFields(
                { name: `${E.ARTIST} Action by`, value: interaction.user.toString(), inline: true }
            )
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    },
};
const { E } = require('../../utils/emojis');