import 'lib/session'
import 'lib/init'

import {
  setupMenu,
  SettingsDialog,
  AppLauncher,
  Overview,
  PowerMenu,
  Verification,
  Indicators,
  Notifications,
  Bar, BarRoundedCorners,
} from 'windows'

import { config, forMonitors } from 'lib/utils'
import { init } from 'lib/init'
import options from 'options'

export default config({
  icons: `${App.configDir}/assets/icons`,
  onConfigParsed: () => {
    setupMenu()
    init()
  },
  closeWindowDelay: {
    applauncher: options.transition.value,
    overview: options.transition.value,
  },
  windows: [
    ...forMonitors(Bar),
    // ...forMonitors(Desktop),
    ...forMonitors(Notifications),
    ...forMonitors(BarRoundedCorners),
    ...forMonitors(Indicators),
    Overview,
    PowerMenu,
    AppLauncher,
    Verification,
    SettingsDialog,
  ],
})
