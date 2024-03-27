import middle from './middle'
import workspaces from './workspaces'

import tray from './Tray'
import control from './Control'
import datemenu from './Datemenu'
import launcher from './Launcher'

// Command Revealers
import leftCommands from './commands/leftCommands'
import rightCommands from './commands/rightCommands'

export default {
  tray,
  middle,
  control,
  launcher,
  datemenu,
  workspaces,
  leftCommands,
  rightCommands,
  expander: () => Widget.Box({ expand: true })
}
