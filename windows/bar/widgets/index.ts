import media from './media'
import settings from './settings'
import workspaces from './workspaces'

import tray from './Tray'
import profile from './Profile'
import datemenu from './Datemenu'
import launcher from './Launcher'
import notifs from './Notifications'

// Command Revealers
import leftCommands from './commands/LeftCommands'
import rightCommands from './commands/rightCommands'

export default {
  tray,
  media,
  notifs,
  profile,
  launcher,
  datemenu,
  settings,
  workspaces,
  leftCommands,
  rightCommands,
  expander: () => Widget.Box({ expand: true })
}
