import 'lib/globals'
import 'lib/session'
import 'css/style'

import init from 'lib/init'

import Overview from './overview'
import StatusBar from './statusbar'

import Popups from './popups'
import Dialogs from './dialogs'
import SideMenus from './sidemenus'
import Background from './background'
import Fullscreen from './fullscreen'

App.config({
  onConfigParsed: init,
  windows: [ StatusBar, Overview ].concat(
    Popups,
    Dialogs,
    SideMenus,
    Fullscreen,
    Background,
  ),
})
