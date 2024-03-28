import 'lib/session'
import 'style/style'
import init from 'lib/init'

import { forMonitors } from 'lib/utils'
import { TopBar, Centered, Dialogs, Popups, SideMenus } from 'windows'

const windows = [ ...forMonitors(TopBar) ].concat(Centered, Dialogs, Popups, SideMenus)

App.config({ 
  windows,
  onConfigParsed: init,
})
