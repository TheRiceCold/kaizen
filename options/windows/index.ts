import { opt } from 'lib/option'
import bar from './bar'
import media from './media'
import launcher from './launcher'
import dropmenu from './dropmenu'
import leftmenus from './leftmenus'

export default {
  bar: {...bar},
  media: {...media},
  dropmenu: {...dropmenu},
  launcher: {...launcher},
  leftmenus: {...leftmenus},

  overview: {
    scale: opt(9),
    workspaces: opt(9),
    monochromeIcon: opt(true),
  },

  powermenu: {
    sleep: opt('systemctl suspend'),
    reboot: opt('systemctl reboot'),
    logout: opt('pkill Hyprland'),
    shutdown: opt('shutdown now'),
    layout: opt<'line' | 'box'>('line'),
    labels: opt(true),
  },

  datemenu: {
    position: opt<'left' | 'center' | 'right'>('right'),
  },

  indicators: {
    progress: {
      vertical: opt(false),
      pack: {
        h: opt<'start' | 'center' | 'end'>('center'),
        v: opt<'start' | 'center' | 'end'>('start'),
      },
    },
    microphone: {
      pack: {
        h: opt<'start' | 'center' | 'end'>('center'),
        v: opt<'start' | 'center' | 'end'>('end'),
      },
    },
  },

  notifications: {
    width: opt(440),
    blacklist: opt(['Spotify']),
  },
}
