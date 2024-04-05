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
    lock: 'system-lock-screen-symbolic',
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
    charging: "battery-flash-symbolic",
    warning: "battery-empty-symbolic",
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
  weather: {
    day: {
      "113": 'sunny',
      "116": 'partly-cloudy',
      "119": 'cloudy',
      "122": 'very-cloudy',
      "143": 'fog',
      "176": 'light-showers',
      "179": 'light-sleet-showers',
      "182": 'light-sleet',
      "185": 'light-sleet',
      "200": 'thundery-showers',
      "227": 'light-snow',
      "230": 'heavy-snow',
      "248": 'fog',
      "260": 'fog',
      "263": 'light-showers',
      "266": 'light-rain',
      "281": 'light-sleet',
      "284": 'light-sleet',
      "293": 'light-rain',
      "296": 'light-rain',
      "299": "\uf019", //"HeavyShowers",
      "302": "\uf019", //"HeavyRain",
      "305": "\uf019", //"HeavyShowers",
      "308": "\uf019", //"HeavyRain",
      "311": 'light-sleet',
      "314": 'light-sleet',
      "317": 'light-sleet',
      "320": 'light-snow',
      "323": 'light-snow-showers',
      "326": 'light-snow-showers',
      "329": 'heavy-snow',
      "332": 'heavy-snow',
      "335": 'heavy-snow-showers',
      "338": 'heavy-snow',
      "350": 'light-sleet',
      "353": 'light-showers',
      "356": "\uf019", //"HeavyShowers",
      "359": "\uf019", //"HeavyRain",
      "362": 'light-sleet-showers',
      "365": 'light-sleet-showers',
      "368": "\uf017", //"LightSnowShowers",
      "371": "\uf017", //"HeavySnowShowers",
      "374": "\uf0b5", //"LightSleetShowers",
      "377": "\uf0b5", //"LightSleet",
      "386": "\uf01e", //"ThunderyShowers",
      "389": "\uf01e", //"ThunderyHeavyRain",
      "392": "\uf01e", //"ThunderySnowShowers",
      "395": "\uf01b", //"HeavySnowShowers",
    },
    night: {
      "113": "\uf02e", // Night
      "116": 'night-partly-cloudy',
      "119": 'night-partly-cloudy',
    }
  }
}
