import { App } from './imports.js'

import init from './settings/init.js'
import windows from './windows/main.js'

export default {
  windows,
  onConfigParsed: init,
  stackTraceOnError: true,
  style: `${App.configDir}/main.css`,
}
