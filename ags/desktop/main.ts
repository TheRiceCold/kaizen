import 'lib/globals'
import 'lib/session'
import 'css/style'

import init from 'lib/init'

import TopBar from './topbar'
import Overview from './overview'

import Popups from './popups'
import SideMenus from './sidemenus'
import Background from './background'
import Fullscreen from './fullscreen'

App.config({
  onConfigParsed: init,
  windows: [Overview, TopBar].concat(Popups, SideMenus, Fullscreen, Background),
})
