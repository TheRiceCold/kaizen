import 'lib/session'
import 'lib/init'
import 'style/style'

import { forMonitors } from 'lib/utils'
import { TopBar, Centered, Dialogs, Popups } from 'windows'

const windows = [ ...forMonitors(TopBar) ].concat(Centered, Dialogs, Popups)

App.config({ windows })
