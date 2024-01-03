import { App } from '../../../imports.js'
import { Clock } from '../../../misc/main.js'

import PanelButton from './PanelButton.js'

export default props => PanelButton({
  ...props,
  window: 'dashboard',
  className: 'dashboard panel-button',
  content: Clock({ format: '%I:%M %p • %A %d' }),
  onSecondaryClick: () => App.toggleWindow('dashboard'),
})
