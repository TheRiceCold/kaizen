// App.addIcons(`${App.configDir}/assets`)

import 'lib/session'
// import 'lib/init'

import options from 'options'
import { init } from 'lib/init'

import windows from 'windows'

init()
export default {
  // onConfigParsed: () => { init() }, // FIX: Not working, idk why
  // closeWindowDelay: { applauncher: options.transition.value },
  windows,
}
