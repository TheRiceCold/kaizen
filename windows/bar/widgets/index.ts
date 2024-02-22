import tray from './Tray'
import date from './Date'
import media from './Media'
import launcher from './Launcher'
import batteryBar from './BatteryBar'
import workspaces from './Workspaces'

export default {
  date,
  tray,
  media,
  launcher,
  workspaces,
  battery: batteryBar,
  expander: () => Widget.Box({ expand: true }),
}
