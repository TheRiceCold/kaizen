import tray from './Tray'
import media from './Media'
import datemenu from './Datemenu'
import launcher from './Launcher'
import settings from './Settings'
import powermenu from './Powermenu'
import notifs from './Notifications'
import workspaces from './Workspaces'

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
