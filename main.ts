import 'lib/session'
import 'style/style'
import init from 'lib/init'

import { forMonitors } from 'lib/utils'
import { TopBar, Centered, Popups, SideMenus } from 'windows'

App.config({ 
  windows: [ ...forMonitors(TopBar) ].concat(
    Popups, Centered, SideMenus
  ),
  onConfigParsed: init,
})
