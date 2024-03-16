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
    executable: 'application-x-executable-symbolic',
    notification: 'dialog-information-symbolic',
    video: 'video-x-generic-symbolic',
    audio: 'audio-x-generic-symbolic',
  },
  nix: {
    nix: "nixos-symbolic",
  },
  app: {
    terminal: "terminal-symbolic",
  },
  ui: {
    pin: 'pin-symbolic',
    info: 'info-symbolic',
    broom: 'broom-symbolic',
    menu: 'open-menu-symbolic',
    toolbars: 'toolbars-symbolic',
    close: 'window-close-symbolic',
    link: 'external-link-symbolic',
    tick: 'object-select-symbolic',
    refresh: 'view-refresh-symbolic',
    search: 'system-search-symbolic',
    avatar: 'avatar-default-symbolic',
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
      "113": "\uf00d", //"Sunny",
      "116": "\uf002", //"PartlyCloudy",
      "119": "\uf041", //"Cloudy",
      "122": "\uf013", //"VeryCloudy",
      "143": "\uf003", //"Fog",
      "176": "\uf01a", //"LightShowers",
      "179": "\uf017", //"LightSleetShowers",
      "182": "\uf0b5", //"LightSleet",
      "185": "\uf0b5", //"LightSleet",
      "200": "\uf01d", //"ThunderyShowers",
      "227": "\uf01b", //"LightSnow",
      "230": "\uf01b", //"HeavySnow",
      "248": "\uf014", //"Fog",
      "260": "\uf014", //"Fog",
      "263": "\uf01a", //"LightShowers",
      "266": "\uf01a", //"LightRain",
      "281": "\uf0b5", //"LightSleet",
      "284": "\uf0b5", //"LightSleet",
      "293": "\uf01a", //"LightRain",
      "296": "\uf01a", //"LightRain",
      "299": "\uf019", //"HeavyShowers",
      "302": "\uf019", //"HeavyRain",
      "305": "\uf019", //"HeavyShowers",
      "308": "\uf019", //"HeavyRain",
      "311": "\uf0b5", //"LightSleet",
      "314": "\uf0b5", //"LightSleet",
      "317": "\uf0b5", //"LightSleet",
      "320": "\uf01b", //"LightSnow",
      "323": "\uf017", //"LightSnowShowers",
      "326": "\uf017", //"LightSnowShowers",
      "329": "\uf01b", //"HeavySnow",
      "332": "\uf01b", //"HeavySnow",
      "335": "\uf01b", //"HeavySnowShowers",
      "338": "\uf01b", //"HeavySnow",
      "350": "\uf0b5", //"LightSleet",
      "353": "\uf01a", //"LightShowers",
      "356": "\uf019", //"HeavyShowers",
      "359": "\uf019", //"HeavyRain",
      "362": "\uf017", //"LightSleetShowers",
      "365": "\uf017", //"LightSleetShowers",
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
      "116": "\uf086", // Partly cloudy, night
      "119": "\uf086", // Partly cloudy, night
    }
  }
}
