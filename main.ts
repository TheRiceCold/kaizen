import 'lib/session'
import 'lib/init'
import 'style/style'

import { forMonitors } from 'lib/utils'
import { TopBar, Centered, Dialogs, Popups, SideMenus } from 'windows'

const windows = [ ...forMonitors(TopBar) ].concat(Centered, Dialogs, Popups, SideMenus)

App.config({ windows })
