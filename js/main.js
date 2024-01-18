import { App, Utils } from './imports.js'
import init from './settings/init.js'
import windows from './windows/main.js'

Utils.exec(`sass ${App.configDir}/sass/main.sass ${App.configDir}/main.css`)
App.resetCss()
App.applyCss(`${App.configDir}/main.css`)

export default {
  windows,
  onConfigParsed: init,
  style: `${App.configDir}/main.css`,
}
