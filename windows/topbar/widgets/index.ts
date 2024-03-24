import middle from './middle'
import control from './control'
import profile from './profile'
import workspaces from './workspaces'

import tray from './Tray'
import datemenu from './Datemenu'
import launcher from './Launcher'

// Command Revealers
import leftCommands from './commands/leftCommands'
import rightCommands from './commands/rightCommands'

export default {
  tray,
  middle,
  profile,
  control,
  launcher,
  datemenu,
  workspaces,
  leftCommands,
  rightCommands,
  expander: () => Widget.Box({ expand: true })
}
