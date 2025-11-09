require('dotenv').config();

const E = {
  MUSIC: process.env.EMOJI_MUSIC || '🎵',
  ARTIST: process.env.EMOJI_ARTIST || '👤',
  DURATION: process.env.EMOJI_DURATION || '⏱️',
  VOLUME: process.env.EMOJI_VOLUME || '🔊',
  VOLUME_MUTE: process.env.EMOJI_VOLUME_MUTE || '🔇',
  VOLUME_LOW: process.env.EMOJI_VOLUME_LOW || '🔉',
  VOLUME_LOUD: process.env.EMOJI_VOLUME_LOUD || '📢',
  LOOP: process.env.EMOJI_LOOP || '🔁',
  LOOP_TRACK: process.env.EMOJI_LOOP_TRACK || '🔂',
  QUEUE: process.env.EMOJI_QUEUE || '📋',
  STATUS_PAUSED: process.env.EMOJI_STATUS_PAUSED || '⏸️',
  STATUS_PLAYING: process.env.EMOJI_STATUS_PLAYING || '▶️',
  PROGRESS: process.env.EMOJI_PROGRESS || '⏯️',
  PROGRESS_KNOB: process.env.EMOJI_PROGRESS_KNOB || '🔘',
  PROGRESS_DOT: process.env.EMOJI_PROGRESS_DOT || '•',
  BUTTON_PAUSE: process.env.EMOJI_BUTTON_PAUSE || '⏸️',
  BUTTON_SKIP: process.env.EMOJI_BUTTON_SKIP || '⏭️',
  BUTTON_STOP: process.env.EMOJI_BUTTON_STOP || '⏹️',
  BUTTON_SHUFFLE: process.env.EMOJI_BUTTON_SHUFFLE || '🔀',
  BUTTON_LOOP: process.env.EMOJI_BUTTON_LOOP || '🔁',
  LEAVE: process.env.EMOJI_LEAVE || '👋',
  ERROR: process.env.EMOJI_ERROR || '❌',
  SUCCESS: process.env.EMOJI_SUCCESS || '✅',
  COOLDOWN: process.env.EMOJI_COOLDOWN || '⏰'
};

function volumeEmoji(level) {
  if (level === 0) return E.VOLUME_MUTE;
  if (level <= 30) return E.VOLUME_LOW;
  if (level <= 70) return E.VOLUME;
  return E.VOLUME_LOUD;
}

module.exports = { E, volumeEmoji };