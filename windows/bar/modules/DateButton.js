import { App } from '../../../imports.js'
import { Clock } from '../../../misc/main.js'

import PanelButton from './PanelButton.js'

export default () => PanelButton({
  window: 'dashboard',
  content: Clock({ format: '%I:%M • %A %d' }),
  className: 'dashboard panel-button',
  onClicked: () => App.toggleWindow('dashboard'),
})
