// App.addIcons(`${App.configDir}/assets`)

import 'lib/session'
import 'lib/init'
import options from 'options'
// import Overview from "widget/overview/Overview"
// import PowerMenu from "widget/powermenu/PowerMenu"
// import Verification from "widget/powermenu/Verification"
// import NotificationPopups from "widget/notifications/NotificationPopups"
// import SettingsDialog from "widget/settings/SettingsDialog"
import { Bar, BarRoundedCorners, AppLauncher, Indicators }from 'windows'
import { forMonitors } from 'lib/utils'
import { init } from 'lib/init'

export default {
  onConfigParsed: init,
  closeWindowDelay: {
    applauncher: options.transition.value,
    overview: options.transition.value,
    // "quicksettings": options.transition.value,
    // "datemenu": options.transition.value,
  },
  windows: [
    ...forMonitors(Bar),
    // ...forMonitors(NotificationPopups),
    ...forMonitors(BarRoundedCorners),
    ...forMonitors(Indicators),
    AppLauncher,
    // Overview(),
    // PowerMenu(),
    // Verification(),
    // SettingsDialog(),
  ],
}
