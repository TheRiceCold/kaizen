import 'lib/session'
import 'lib/init'

import {
  setupQuickSettings,
  SettingsDialog,
  AppLauncher, Overview,
  Bar, BarRoundedCorners,
  PowerMenu, Verification,
  Indicators, Notifications,
}from 'windows'

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
    ...forMonitors(Notifications),
    ...forMonitors(BarRoundedCorners),
    ...forMonitors(Indicators),
    Overview,
    AppLauncher,
    PowerMenu,
    Verification,
    SettingsDialog(),
  ],
}
