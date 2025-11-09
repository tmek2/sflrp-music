const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { createQueueEmbed } = require('../../utils/musicUtils');
const { E } = require('../../utils/emojis');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Show the music queue')
        .addIntegerOption(option =>
            option.setName('page')
                .setDescription('Page number to display')
                .setMinValue(1)),
    
    async execute(interaction) {
        const player = interaction.client.kazagumo.players.get(interaction.guildId);
        
        if (!player) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription(`${E.ERROR} No music player found!`)],
                ephemeral: true
            });
        }
        
        const page = (interaction.options.getInteger('page') || 1) - 1;
        const maxPages = Math.ceil(player.queue.length / 10);
        
        if (page < 0 || (page >= maxPages && player.queue.length > 0)) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription(`${E.ERROR} Invalid page number! Please choose between 1 and ${maxPages}.`)],
                ephemeral: true
            });
        }
        
        const embed = createQueueEmbed(player, page);
        
        // Add current track info if playing
        if (player.current) {
            embed.addFields({
                name: `${E.MUSIC} Currently Playing`,
                value: `**[${player.current.title}](${player.current.uri})**`,
                inline: false
            });
        }
        
        // Create navigation buttons if there are multiple pages
        const components = [];
        if (maxPages > 1) {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`queue_prev_${page}`)
                        .setLabel('Previous')
                        .setEmoji('⬅️')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(page === 0),
                    new ButtonBuilder()
                        .setCustomId(`queue_next_${page}`)
                        .setLabel('Next')
                        .setEmoji('➡️')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(page >= maxPages - 1)
                );
            components.push(row);
        }
        
        await interaction.reply({
            embeds: [embed],
            components: components
        });
    },
};