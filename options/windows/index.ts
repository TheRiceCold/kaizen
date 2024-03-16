import { opt } from 'lib/option'
import bar from './bar'
import launcher from './launcher'
import dropmenu from './dropmenu'

export default {
  bar: {...bar},
  dropmenu: {...dropmenu},
  launcher: {...launcher},

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

  media: {
    coverSize: opt(100),
    monochromeIcon: opt(true),
    position: opt<'left' | 'center' | 'right'>('center'),
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
    position: opt<Array<'top' | 'bottom' | 'left' | 'right'>>(['top']),
    blacklist: opt(['Spotify']),
    width: opt(440),
  },
}
