import date from './Date'
import menu from './Menu'
import tray from './Tray'
import launcher from './launcher'
import batteryBar from './batterybar'
import workspaces from './workspaces'

export default {
  date,
  tray,
  menu,
  launcher,
  workspaces,
  battery: batteryBar,
  expander: () => Widget.Box({ expand: true }),
}
