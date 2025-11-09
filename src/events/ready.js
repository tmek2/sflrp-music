const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`🚀 Ready! Logged in as ${client.user.tag}`);
        console.log(`📊 Serving ${client.guilds.cache.size} guilds with ${client.users.cache.size} users`);
        
        // Set bot activity
  const { E } = require('../utils/emojis');
  client.user.setActivity(`${E.MUSIC} Music | /help`, {
            type: ActivityType.Listening 
        });

        // Register slash commands globally
        await client.registerSlashCommands();
    },
};