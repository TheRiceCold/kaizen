import { create, opt } from 'lib/option'

import theme from './theme'
import topbar from './topbar'
import chatbot from './chatbot'
import dashboard from './dashboard'
import workspaces from './workspaces'

export default create(OPTIONS, {
  ...theme,

  topbar: { ...topbar },
  chatbot: { ...chatbot },
  dashboard: { ...dashboard },
  workspaces: { ...workspaces },

  notifications: {
    blacklist: opt(['Spotify']),
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
