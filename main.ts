import 'lib/session'
import 'lib/init'
import options from 'options'
import {
  Bar, BarRoundedCorners,
  AppLauncher, Overview,
  PowerMenu, Verification,
  Indicators
}from 'windows'
import { forMonitors } from 'lib/utils'
import { init } from 'lib/init'

export default {
  onConfigParsed: init,
  closeWindowDelay: {
    applauncher: options.transition.value,
    overview: options.transition.value,
  },
  windows: [
    ...forMonitors(Bar),
    ...forMonitors(BarRoundedCorners),
    ...forMonitors(Indicators),
    Overview,
    AppLauncher,
    PowerMenu,
    Verification,
  ],
}
