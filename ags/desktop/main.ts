import 'lib/globals'
import 'lib/session'
import 'css/style'

import init from 'lib/init'

// import { forMonitors } from 'lib/utils'
import TopBar from './topbar'
import Popups from './popups'
import SideMenus from './sidemenus'
import Background from './background'
import Fullscreen from './fullscreen'

App.config({
  onConfigParsed: init,
  windows: [ TopBar, Background ].concat(Popups, SideMenus, Fullscreen),
})
