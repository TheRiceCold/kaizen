import 'lib/session'
import 'lib/init'

import {
  setupQuickSettings,
  SettingsDialog,
  AppLauncher,
  Overview,
  PowerMenu,
  Verification,
  Indicators,
  Notifications,
  Bar, BarRoundedCorners,
} from 'windows'

import { forMonitors } from 'lib/utils'
import { init } from 'lib/init'
import options from 'options'

export default {
  onConfigParsed: () => {
    setupQuickSettings()
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
    SettingsDialog(),
  ],
}
