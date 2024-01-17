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
    off: 'display-brightness-off-symbolic',
    low: 'display-brightness-low-symbolic',
    high: 'display-brightness-high-symbolic',
    indicator: 'display-brightness-symbolic',
    keyboard: 'keyboard-brightness-symbolic',
    medium: 'display-brightness-medium-symbolic',
    screen: ['󰛩', '󱩎', '󱩏', '󱩐', '󱩑', '󱩒', '󱩓', '󱩔', '󱩕', '󱩖', '󰛨'],
  },
  powermenu: {
    reboot: 'system-reboot-symbolic',
    logout: 'system-log-out-symbolic',
    shutdown: 'system-shutdown-symbolic',
    sleep: 'weather-clear-night-symbolic',
  },
  recorder: {
    recording: 'media-record-symbolic',
  },
  notifications: {
    bell: '󰂚',
    chat: 'notification-symbolic',
    silent: 'notifications-disabled-symbolic',
    noisy: 'preferences-system-notifications-symbolic',
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
    info: 'info-symbolic',
    menu: 'open-menu-symbolic',
    link: 'external-link-symbolic',
    tick: 'object-select-symbolic',
    close: 'window-close-symbolic',
    settings: 'emblem-system-symbolic',
    arrow: {
      up: 'pan-up-symbolic',
      right: 'pan-end-symbolic',
      down: 'pan-down-symbolic',
      left: 'pan-start-symbolic',
    },
  },
  system: { temp: '', cpu: '', ram: '' },
  dialog: {
    Bar: '',
    Font: '',
    Color: '󰏘',
    Theme: '󰃟',
    Search: '',
    Border: '󰃇',
    Desktop: '',
    General: '󰒓',
    Applauncher: '󰵆',
    Miscellaneous: '󰠱',
    Notifications: '󰂚 ',
  },
  ai: {
    chatgpt: `${App.configDir}/assets/chatgpt.svg`,
  }
}
