export const substitutes = {
  'transmission-gtk': 'transmission',
  'blueberry.py': 'blueberry',
  'Caprine': 'facebook-messenger',
  'com.raggesilver.BlackBox-symbolic': 'terminal-symbolic',
  'audio-headset-bluetooth': 'audio-headphones-symbolic',
  'audio-card-analog-usb': 'audio-speakers-symbolic',
  'audio-card-analog-pci': 'audio-card-symbolic',
  'preferences-system': 'emblem-system-symbolic',
  'com.github.Aylur.ags-symbolic': 'controls-symbolic',
  'com.github.Aylur.ags': 'controls-symbolic',
}

export default {
  fallback: {
    executable: 'application-x-executable',
    notification: 'dialog-information-symbolic',
    video: 'video-x-generic-symbolic',
    audio: 'audio-x-generic-symbolic',
  },
  ai: {
    open_ai: 'open-ai-symbolic',
    gemini: 'google-gemini-symbolic',
  },
  nix: {
    nix: 'nix-snowflake-symbolic',
  },
  app: {
    terminal: 'terminal-symbolic',
  },
  ui: {
    pin: 'pin-symbolic',
    send: 'send-symbolic',
    info: 'info-symbolic',
    camera: 'camera-symbolic',
    menu: 'open-menu-symbolic',
    toolbars: 'toolbars-symbolic',
    close: 'window-close-symbolic',
    link: 'external-link-symbolic',
    tick: 'object-select-symbolic',
    refresh: 'view-refresh-symbolic',
    search: 'system-search-symbolic',
    settings: 'emblem-system-symbolic',
    warning: 'dialog-warning-symbolic',
    colorpicker: 'color-select-symbolic',
    arrow: {
      right: 'pan-end-symbolic',
      left: 'pan-start-symbolic',
      down: 'pan-down-symbolic',
      up: 'pan-up-symbolic'
    },
  },
  audio: {
    mic: {
      muted: 'microphone-disabled-symbolic',
      low: 'microphone-sensitivity-low-symbolic',
      medium: 'microphone-sensitivity-medium-symbolic',
      high: 'microphone-sensitivity-high-symbolic'
    },
    volume: {
      muted: 'audio-volume-muted-symbolic',
      low: 'audio-volume-low-symbolic',
      medium: 'audio-volume-medium-symbolic',
      high: 'audio-volume-high-symbolic',
      overamplified: 'audio-volume-overamplified-symbolic',
    },
    type: {
      headset: 'audio-headphones-symbolic',
      speaker: 'audio-speakers-symbolic',
      card: 'audio-card-symbolic',
    },
    mixer: 'mixer-symbolic',
  },
  battery: {
    charging: 'battery-flash-symbolic',
    warning: 'battery-empty-symbolic',
  },
  bluetooth: {
    enabled: 'bluetooth-active-symbolic',
    disabled: 'bluetooth-disabled-symbolic'
  },
  brightness: {
    indicator: 'display-brightness-symbolic',
    keyboard: 'keyboard-brightness-symbolic',
    screen: 'display-brightness-symbolic'
  },
  powermenu: {
    lock: 'system-lock-screen-symbolic',
    sleep: 'weather-clear-night-symbolic',
    reboot: 'system-reboot-symbolic',
    logout: 'system-log-out-symbolic',
    shutdown: 'system-shutdown-symbolic',
  },
  recorder: {
    recording: 'media-record-symbolic'
  },
  notifications: {
    noisy: 'org.gnome.Settings-notifications-symbolic',
    silent: 'notifications-disabled-symbolic',
    message: 'chat-bubbles-symbolic',
  },
  trash: {
    empty: 'user-trash-symbolic',
    full: 'user-trash-full-symbolic'
  },
  mpris: {
    shuffle: {
      enabled: 'media-playlist-shuffle-symbolic',
      disabled: 'media-playlist-consecutive-symbolic',
    },
    loop: {
      none: 'media-playlist-repeat-symbolic',
      track: 'media-playlist-repeat-song-symbolic',
      playlist: 'media-playlist-repeat-symbolic',
    },
    playing: 'media-playback-pause-symbolic',
    paused: 'media-playback-start-symbolic',
    stopped: 'media-playback-start-symbolic',
    prev: 'media-skip-backward-symbolic',
    next: 'media-skip-forward-symbolic',
  },
  system: {
    cpu: 'org.gnome.SystemMonitor-symbolic',
    ram: 'drive-harddisk-solidstate-symbolic',
    temp: 'temperature-symbolic',
  },
  color: {
    dark: 'dark-mode-symbolic',
    light: 'light-mode-symbolic'
  },
  weatherCodes: {
    0: { day: 'sunny', night: 'clear' },
    1: { day: 'sunny', night: 'clear' },
    2: { day: 'partly_cloudy', night: 'partly_cloudy_night' },
    3: { day: 'cloudy', night: 'cloudy' },
    45:{ day: 'foggy', night: 'foggy_night' },
    48: { day: 'foggy', night: 'foggy_night' },
    51: { day: 'drizzle', night: 'drizzle' }, // Light
    53: { day: 'drizzle', night: 'drizzle' },
    55: { day: 'drizzle', night: 'drizzle' }, // Heavy
    56: { day: 'drizzle', night: 'drizzle' }, // Light Frezzing
    57: { day: 'drizzle', night: 'drizzle' }, // Frezzing
    61: { day: 'rain', night: 'rain' }, // Light
    63: { day: 'rain', night: 'rain' },
    65: { day: 'rain', night: 'rain' }, // Heavy
    66: { day: 'rain', night: 'rain' }, // Light Freezing
    67: { day: 'rain', night: 'rain' }, // Freezing
    71: { day: 'snow', night: 'snow' }, // Light
    73: { day: 'snow', night: 'snow' },
    75: { day: 'snow', night: 'snow' }, // Heavy
    77: { day: 'snow', night: 'snow' }, // Grains
    80: { day: 'showers', night: 'showers' }, // Light
    81: { day: 'showers', night: 'showers' },
    82: { day: 'heavy_showers', night: 'heavy_showers' },
    85: { day: 'snow', night: 'snow' }, // Light Snow Showers
    86: { day: 'snow', night: 'snow', }, // Snow Showers
    95: { day: 'thunderstorm', night: 'thunderstorm_night' },
    96: { day: 'thunderstorm', night: 'thunderstorm_night' }, // Light With Hail
    99: { day: 'thunderstorm', night: 'thunderstorm_night' }, // With Hail
    113: { day: 'sunny', night: 'clear' },
    176: { day: 'showers', night: 'showers' },
  }
}
