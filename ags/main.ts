import 'lib/globals'
import 'lib/session'
import 'style/style'
import init from 'lib/init'

import { forMonitors } from 'lib/utils'
import { TopBar, Fullscreen, Popups, SideMenus } from 'windows'

App.config({ 
  onConfigParsed: init,
  windows: [ ...forMonitors(TopBar) ].concat(Popups, Fullscreen, SideMenus),
})
