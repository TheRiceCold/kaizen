import middle from './middle'
import workspaces from './workspaces'

import tray from './Tray'
import DateButton from './DateButton'
import PowerButton from './PowerButton'
import ControlButton from './ControlButton'
import LauncherButton from './LauncherButton'

// Command Revealers
import leftCommands from './commands/leftCommands'
import rightCommands from './commands/rightCommands'

export default {
  tray,
  middle,

  date: DateButton,
  power: PowerButton,
  control: ControlButton,
  launcher: LauncherButton,

  workspaces,
  leftCommands,
  rightCommands,
  expander: () => Widget.Box({ expand: true })
}
