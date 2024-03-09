import 'lib/session'
import 'lib/init'

import {
  setupDropMenu,
  setupDateMenu,
  Media,
  Launcher,
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

App.config({
  onConfigParsed: () => {
    setupDropMenu()
    setupDateMenu()
    init()
  },
  closeWindowDelay: {
    dropmenu: options.transition.value,
    datemenu: options.transition.value,
    launcher: options.transition.value,
    overview: options.transition.value,
  },
  windows: () => [
    ...forMonitors(Bar),
    ...forMonitors(Notifications),
    ...forMonitors(BarRoundedCorners),
    ...forMonitors(Indicators),
    Media,
    Launcher,
    Overview,
    PowerMenu,
    Verification,
  ],
})
