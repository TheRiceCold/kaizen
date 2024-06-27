import { opt } from 'lib/option'

import bar from './bar'
import run from './run'
import popups from './popups'
import sideleft from './sideleft'
import sideright from './sideright'
import dashboard from './dashboard'

export default {
  bar: {...bar},
  run: {...run},
  popups: {...popups},
  sideleft: {...sideleft},
  sideright: {...sideright},
  dashboard: {...dashboard},

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
