import 'lib/session'
import 'lib/init'

import {
  setupMenu,
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
  icons: `./assets/icons`,
  onConfigParsed: () => {
    setupMenu()
    setupDateMenu()
    init()
  },
  closeWindowDelay: {
    menu: options.transition.value,
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
