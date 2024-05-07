import 'lib/globals'
import 'lib/session'
import 'style/style'
import init from 'lib/init'

// import { forMonitors } from 'lib/utils'
import { TopBar, Popups, SideMenus, Fullscreen } from 'windows'

App.config({ 
  onConfigParsed: init,
  windows: [ TopBar ].concat(Popups, SideMenus, Fullscreen),
})
