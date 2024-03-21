import 'lib/session'
import 'lib/init'
import 'style/style'

import { forMonitors } from 'lib/utils'
import { TopBar, Popups, Dialogs } from 'windows'

const windows = [ ...forMonitors(TopBar) ].concat(Dialogs, Popups)

App.config({ windows })
