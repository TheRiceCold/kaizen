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

import { config, forMonitors } from 'lib/utils'
import { init } from 'lib/init'
import options from 'options'

export default config({
  icons: `${App.configDir}/assets/icons`,
  onConfigParsed: () => {
    setupMenu()
    setupDateMenu()
    init()
  },
  closeWindowDelay: {
    overview: options.transition.value,
  },
  windows: [
    ...forMonitors(Bar),
    // ...forMonitors(Desktop),
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
