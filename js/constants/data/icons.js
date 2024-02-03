import { App } from '../../imports.js'

export default {
  distro: {
    fedora: '',
    arch: '',
    nixos: '',
    debian: '',
    'opensuse-tumbleweed': '',
    ubuntu: '' ,
    endeavouros: '' ,
  },

  audio: {
    mic: {
      muted: 'microphone-sensitivity-muted-symbolic',
      unmuted: 'audio-input-microphone-symbolic',
      low: 'microphone-sensitivity-low-symbolic',
      medium: 'microphone-sensitivity-medium-symbolic',
      high: 'microphone-sensitivity-high-symbolic',
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
    mixer: 'view-list-symbolic',
  },

  battery: {
    default: '󱐋',
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
    lock: '',
    sleep: '󰒲', 
    cancel: '󱎘', 
    logout: '󰍃',
    reboot: '󰜉', 
    shutdown: '',
    hibernate: '⏼',
  },

  notifications: {
    bell: '󰂚',
    chat: 'notification-symbolic',
    silent: 'notifications-disabled-symbolic',
    noisy: 'preferences-system-notifications-symbolic',
  },

  mpris: {
    fallback: '󰎈',
    shuffle: { enabled: '󰒟', disabled: '󰒟' },
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
    colorpicker: 'color-select-symbolic',
    close: 'window-close-symbolic',
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

  arrow: {
    up: 'pan-up-symbolic',
    right: 'pan-end-symbolic',
    down: 'pan-down-symbolic',
    left: 'pan-start-symbolic',
  },

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
  sidebar: {
    chatgpt: `${App.configDir}/assets/chatgpt.svg`,
    calendar: `${App.configDir}/assets/calendar.svg`,
  },

  apps: {
    apps: 'view-app-grid-symbolic',
    search: 'folder-saved-search-symbolic',
  },
}
