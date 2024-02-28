import tray from './Tray'
import date from './Date'
import media from './Media'
import utils from './Utils'
import launcher from './launcher'
import batteryBar from './batterybar'
import workspaces from './workspaces'

export default {
  date,
  tray,
  media,
  utils,
  launcher,
  workspaces,
  battery: batteryBar,
  expander: () => Widget.Box({ expand: true }),
}
