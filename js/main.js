import init from './settings/init.js'
import windows from './windows/main.js'

export default {
  style: './main.css',
  onConfigParsed: init,
  windows: windows().flat(1),
}
