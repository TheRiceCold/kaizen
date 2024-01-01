import { App } from './imports.js'

import init from './settings/init.js'
import windows from './windows/main.js'

App.resetCss()
App.applyCss(`${App.configDir}/main.css`)

export default {
  windows,
  onConfigParsed: init,
  stackTraceOnError: true,
}
