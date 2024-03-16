import tray from './tray'
import media from './media'
import launcher from './launcher'
import settings from './settings'
import workspaces from './workspaces'

import datemenu from './Datemenu'
import powermenu from './Powermenu'
import notifs from './Notifications'

export default {
  tray,
  media,
  notifs,
  launcher,
  datemenu,
  settings,
  powermenu,
  workspaces,
  expander: () => Widget.Box({ expand: true })
}
