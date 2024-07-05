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
    ram: 'memory-symbolic',
    temp: 'temperature-symbolic',
    cpu: 'org.gnome.SystemMonitor-symbolic',
    storage: 'drive-harddisk-solidstate-symbolic',
  },
  color: {
    dark: 'dark-mode-symbolic',
    light: 'light-mode-symbolic'
  },
}
