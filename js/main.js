import { App } from './imports.js'
import init from './settings/init.js'
import windows from './windows/main.js'

const style = `${App.configDir}/main.css`

export default {
  style,
  windows,
  onConfigParsed: init,
}
