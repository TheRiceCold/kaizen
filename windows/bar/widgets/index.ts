import tray from './Tray'
import media from './Media'
import date from './DateMenu'
import dropmenu from './DropMenu'
import launcher from './Launcher'
import batteryBar from './BatteryBar'
import workspaces from './Workspaces'

export default {
  tray,
  date,
  media,
  dropmenu,
  launcher,
  workspaces,
  battery: batteryBar,
  expander: () => Widget.Box({ expand: true }),
}
