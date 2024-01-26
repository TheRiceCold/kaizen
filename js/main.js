import { App } from './imports.js'
import init from './settings/init.js'
import windows from './windows/main.js'

const style = `${App.configDir}/main.css`

export default {
  style,
  onConfigParsed: init,
  windows: windows().flat(1),
}
