import 'lib/session'
import 'lib/init'
import 'style/style'

import {
  setupDropMenu,
  setupDateMenu,
  Bar,
  Popups,
  Launcher,
  Overview,
  PowerMenu,
  Verification,
  Indicators,
} from 'windows'

import { forMonitors } from 'lib/utils'
import options from 'options'

App.config({
  onConfigParsed: () => {
    setupDropMenu()
    setupDateMenu()
  },
  closeWindowDelay: {
    dropmenu: options.transition.value,
    datemenu: options.transition.value,
    launcher: options.transition.value,
    overview: options.transition.value,
  },
  windows: () => [
    Popups,
    Launcher,
    Overview,
    PowerMenu,
    Indicators,
    Verification,
    ...forMonitors(Bar),
  ],
})
