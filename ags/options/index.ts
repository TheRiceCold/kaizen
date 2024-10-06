import { create, opt } from 'lib/option'

import theme from './theme'
import widgets from './widgets'
import dashboard from './dashboard'

export default create(OPTIONS, {
  ...theme,
  ...widgets,

  dashboard: { ...dashboard },

  sideright: { width: opt(380) },
  topbar: {
    tray: {
      ignore: opt(['KDE Connect Indicator', 'gromit-mpx']),
    },
    date: {
      interval: 5000,
      format: opt('%a %d %b %I:%M %p'),
    },
    player: {
      preferred: opt('spotify'),
      visualizer: {
        smooth: opt(true),
        length: opt<'short' | 'normal' | 'long' | 'auto'>('long'),
      },
    },
    execCmd: opt<null | string>(null),
  },

  run: {
    position: opt<'left' | 'center' | 'right'>('left'),
    iconSize: opt(48),
    width: opt(0),
    margin: opt(40),
    maxItem: opt(5),
    apps: {
      max: opt(6),
      iconSize: opt(62),
    },
    execCmd: opt<null | string>(null),
  },

  lockscreen: {
    player: opt(true),
    quotes: opt(true),
    weather: opt(true),
    crypto: opt(true),
    system: opt(true),
  },

  powermenu: {
    sleep: opt('systemctl suspend'),
    reboot: opt('systemctl reboot'),
    logout: opt('pkill Hyprland'),
    shutdown: opt('shutdown now'),
  },
})
