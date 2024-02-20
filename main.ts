// App.addIcons(`${App.configDir}/assets`)

import 'lib/session'
// import 'lib/init'

import { init } from 'lib/init'
import { config } from 'lib/utils'
import windows from 'windows/main'

init()
export default config({
  // onConfigParsed: () => { init() }, // FIX: Not working, idk why
  windows,
})
