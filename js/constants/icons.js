import { App } from '../imports.js'

export default {
  lock: '',
  fallback: {
    executable: 'application-x-executable-symbolic',
  },
  audio: {
    mic: {
      muted: '',
      low: 'microphone-sensitivity-low-symbolic',
      medium: 'microphone-sensitivity-medium-symbolic',
      high: '',
    },
    volume: {
      muted: '󰝟',
      low: '󰕿',
      medium: '󰖀',
      high: '󰕾',
    },
    type: {
      headset: '󰋋',
      speaker: '󰓃',
      card: 'audio-card-symbolic',
    },
    mixer: '',
  },
  apps: {
    apps: 'view-app-grid-symbolic',
    search: 'folder-saved-search-symbolic',
  },
  battery: {
    charging: ' ',
    warning: 'battery-empty-symbolic',
  },
  bluetooth: { enabled: '󰂯', disabled: '󰂲' },
  brightness: {
    indicator: 'display-brightness-symbolic',
    keyboard: 'keyboard-brightness-symbolic',
    off: 'display-brightness-off-symbolic',
    low: 'display-brightness-low-symbolic',
    medium: 'display-brightness-medium-symbolic',
    high: 'display-brightness-high-symbolic',
    screen: ['󰛩', '󱩎', '󱩏', '󱩐', '󱩑', '󱩒', '󱩓', '󱩔', '󱩕', '󱩖', '󰛨'],
  },
  powermenu: {
    sleep: 'weather-clear-night-symbolic',
    reboot: 'system-reboot-symbolic',
    logout: 'system-log-out-symbolic',
    shutdown: 'system-shutdown-symbolic',
  },
  recorder: {
    recording: 'media-record-symbolic',
  },
  notifications: {
    bell: '󰂚',
    silent: 'notifications-disabled-symbolic',
    noisy: 'preferences-system-notifications-symbolic',
    chat: 'notification-symbolic',
  },
  trash: {
    empty: '',
    full: 'user-trash-full-symbolic',
  },
  mpris: {
    fallback: '󰎈',
    shuffle: {
      enabled: '󰒟',
      disabled: '󰒟',
    },
    loop: {
      none: '󰓦',
      track: '󰓦',
      playlist: '󰑐',
    },
    playing: '󰏦',
    paused: '󰐍',
    stopped: '󰐍',
    prev: '󰒮',
    next: '󰒭',
  },
  ui: {
    close: 'window-close-symbolic',
    info: 'info-symbolic',
    menu: 'open-menu-symbolic',
    link: 'external-link-symbolic',
    settings: 'emblem-system-symbolic',
    tick: 'object-select-symbolic',
    arrow: {
      right: 'pan-end-symbolic',
      left: 'pan-start-symbolic',
      down: 'pan-down-symbolic',
      up: 'pan-up-symbolic',
    },
  },
  system: {
    temp: '',
    cpu: '',
    ram: '',
  },
  dialog: {
    Search: '',
    Applauncher: '󰵆',
    Bar: '',
    Border: '󰃇',
    Color: '󰏘',
    Desktop: '',
    Font: '',
    General: '󰒓',
    Miscellaneous: '󰠱',
    Theme: '󰃟',
    Notifications: '󰂚 ',
  },
  ai: {
    chatgpt: `${App.configDir}/assets/chatgpt.svg`,
  }
}
