import Bar from './bar/main.js'
import Desktop from './desktop/main.js'
// import Dashboard from './dashboard/main.js'
import Launcher from './launcher/main.js'
import CheatSheet from './cheatsheet/main.js'
// import Indicators from './indicators/main.js'
import SidebarRight from './sideright/main.js'
import ScreenCorners from './screencorners/main.js'
import QuickSettings from './quicksettings/main.js'

export default [
  Bar(),
  Desktop(),
  Launcher(),
  // Dashboard(),
  CheatSheet(),
  // Indicators(),
  SidebarRight(),
  QuickSettings(),
].concat(ScreenCorners)
