import tray from './tray'
import media from './media'
import launcher from './launcher'
import settings from './settings'
import workspaces from './workspaces'

import profile from './Profile'
import datemenu from './Datemenu'
import notifs from './Notifications'

export default {
  tray,
  media,
  notifs,
  profile,
  launcher,
  datemenu,
  settings,
  workspaces,
  expander: () => Widget.Box({ expand: true })
}
