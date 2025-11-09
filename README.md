# Discord Lavalink Music Bot

A feature-rich Discord music bot built with Discord.js v14 and Lavalink, supporting both slash commands and prefix commands with interactive buttons.

## Features

- 🎵 **High-quality music playback** using Lavalink
- 🎛️ **Interactive controls** with Discord v2 components (buttons)
- ⚡ **Dual command support** - Both slash commands (/) and prefix commands (!)
- 🔄 **Loop modes** - Track, Queue, or Off
- 🔀 **Queue management** - Shuffle, skip, stop, pause/resume
- 📋 **Queue display** with pagination
- 🔊 **Volume control** (1-100%)
- 🎯 **Multiple music sources** - YouTube, Spotify, SoundCloud, and more
- 📱 **Clean, modern embeds** with progress bars and track information
- 🛡️ **Permission checks** and error handling
- ⏱️ **Command cooldowns** to prevent spam

## Supported Music Sources

- YouTube & YouTube Music
- Spotify (track links)
- SoundCloud
- Direct audio URLs
- Search queries

## Commands

### Slash Commands (/)
- `/play <query>` - Play a song or playlist
- `/pause` - Pause or resume the current song
- `/skip` - Skip the current song
- `/stop` - Stop music and clear queue
- `/nowplaying` - Show current song information
- `/queue [page]` - Display the music queue
- `/volume [level]` - Set or check volume (1-100)
- `/loop <mode>` - Set loop mode (off/track/queue)
- `/shuffle` - Shuffle the queue
- `/help` - Show all commands

### Prefix Commands (!)
- `!play <query>` - Play a song or playlist
- `!pause` - Pause or resume the current song
- `!skip` - Skip the current song
- `!stop` - Stop music and clear queue
- `!np` - Show current song information
- `!queue [page]` - Display the music queue
- `!volume [level]` - Set or check volume (1-100)
- `!loop [mode]` - Set loop mode (off/track/queue)
- `!shuffle` - Shuffle the queue
- `!help` - Show all commands

### Interactive Controls
Use the buttons below music messages for quick controls:
- ⏸️ Pause/Resume
- ⏭️ Skip
- ⏹️ Stop
- 🔀 Shuffle
- 🔁 Loop

## Installation

### Prerequisites

1. **Node.js** (v16.9.0 or higher)
2. **Lavalink Server** (v3.7 or higher)
3. **Discord Bot Token**

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/friday2su/lavalink-music-bot.git
   cd lavalink-music-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Discord Bot Configuration
   DISCORD_TOKEN=your_discord_bot_token_here
   CLIENT_ID=your_bot_client_id_here

   # Bot Configuration
   PREFIX=!
   OWNER_ID=your_discord_user_id_here

   # Lavalink Configuration
   LAVALINK_HOST=localhost
   LAVALINK_PORT=2333
   LAVALINK_PASSWORD=youshallnotpass
   LAVALINK_SECURE=false
   ```

4. **Set up Lavalink Server**
   
   Download Lavalink from [GitHub Releases](https://github.com/freyacodes/Lavalink/releases)
   
   Create `application.yml`:
   ```yaml
   server:
     port: 2333
     address: 0.0.0.0
   lavalink:
     server:
       password: "youshallnotpass"
       sources:
         youtube: true
         bandcamp: true
         soundcloud: true
         twitch: true
         vimeo: true
         http: true
         local: false
       bufferDurationMs: 400
       frameBufferDurationMs: 5000
       youtubePlaylistLoadLimit: 6
       playerUpdateInterval: 5
       youtubeSearchEnabled: true
       soundcloudSearchEnabled: true
       gc-warnings: true
   ```

5. **Start Lavalink**
   ```bash
   java -jar Lavalink.jar
   ```

6. **Deploy slash commands (optional)**
   ```bash
   npm run deploy
   ```
   Or directly:
   ```bash
   node src/index.js --deploy
   ```
   This manually registers slash commands globally. The bot will also auto-register commands when it starts.

7. **Start the bot**
   ```bash
   npm start
   ```

## Bot Permissions

The bot requires the following permissions:
- `Send Messages`
- `Use Slash Commands`
- `Embed Links`
- `Connect` (to voice channels)
- `Speak` (in voice channels)
- `Use Voice Activity`

## Project Structure

```
src/
├── commands/
│   ├── slash/          # Slash commands
│   └── prefix/         # Prefix commands
├── events/             # Discord.js events
├── utils/              # Utility functions
└── index.js           # Main bot file
```

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_TOKEN` | Your Discord bot token | Yes |
| `CLIENT_ID` | Your bot's client ID | Yes |
| `PREFIX` | Command prefix (default: !) | No |
| `OWNER_ID` | Bot owner's Discord user ID | No |
| `LAVALINK_HOST` | Lavalink server host | Yes |
| `LAVALINK_PORT` | Lavalink server port | Yes |
| `LAVALINK_PASSWORD` | Lavalink server password | Yes |
| `LAVALINK_SECURE` | Use secure connection (wss) | No |

### Emoji Customization

You can customize the emojis used throughout embeds and buttons via environment variables. Copy `.env.example` to `.env` and override any of the following:

| Variable | Default | Used For |
|----------|---------|----------|
| `EMOJI_MUSIC` | `🎵` | Track titles, "Currently Playing" |
| `EMOJI_ARTIST` | `👤` | User/Artist fields (Requested by, Action by) |
| `EMOJI_DURATION` | `⏱️` | Duration display |
| `EMOJI_QUEUE` | `📋` | Queue field titles |
| `EMOJI_STATUS_PAUSED` | `⏸️` | Paused status badge |
| `EMOJI_STATUS_PLAYING` | `▶️` | Playing status badge |
| `EMOJI_PROGRESS` | `⏯️` | Progress bar label |
| `EMOJI_PROGRESS_KNOB` | `🔘` | Progress bar knob |
| `EMOJI_BUTTON_PAUSE` | `⏸️` | Pause/Resume button |
| `EMOJI_BUTTON_SKIP` | `⏭️` | Skip button and titles |
| `EMOJI_BUTTON_STOP` | `⏹️` | Stop button and titles |
| `EMOJI_BUTTON_SHUFFLE` | `🔀` | Shuffle button and titles |
| `EMOJI_BUTTON_LOOP` | `🔁` | Loop button |
| `EMOJI_ERROR` | `❌` | Error messages |
| `EMOJI_SUCCESS` | `✅` | Success messages |
| `EMOJI_COOLDOWN` | `⏰` | Cooldown notices |
| `EMOJI_VOLUME` | `🔊` | Medium volume icon |
| `EMOJI_VOLUME_MUTE` | `🔇` | Muted volume icon |
| `EMOJI_VOLUME_LOW` | `🔉` | Low volume icon |
| `EMOJI_VOLUME_LOUD` | `📢` | Loud volume icon |
| `EMOJI_LOOP` | `🔁` | Loop mode field |
| `EMOJI_LOOP_TRACK` | `🔂` | Track loop mode |
| `EMOJI_LEAVE` | `👋` | Leave voice channel event title |

Notes:
- Volume emoji in embeds is dynamic and will pick from mute/low/medium/loud based on the current level.
- If an environment variable is not set, the default shown above will be used.

### Lavalink Configuration

Make sure your Lavalink server is properly configured with the sources you want to use. The bot supports all sources that Lavalink supports.

## Troubleshooting

### Common Issues

1. **Bot doesn't respond to commands**
   - Check if the bot has proper permissions
   - Verify the bot token is correct
   - Ensure the bot is online

2. **Music doesn't play**
   - Check if Lavalink server is running
   - Verify Lavalink connection settings
   - Ensure the bot has voice permissions

3. **Slash commands not showing**
   - Wait up to 1 hour for global commands to update
   - Check if the bot has `Use Slash Commands` permission
   - Restart the bot if commands were recently added

### Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all configuration settings
3. Ensure all dependencies are installed
4. Check Discord and Lavalink server status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Discord.js](https://discord.js.org/) - Discord API library
- [Lavalink](https://github.com/freyacodes/Lavalink) - Audio delivery node
- [Kazagumo](https://github.com/Takiyo0/Kazagumo) - Lavalink wrapper
- [Shoukaku](https://github.com/Deivu/Shoukaku) - Lavalink connector