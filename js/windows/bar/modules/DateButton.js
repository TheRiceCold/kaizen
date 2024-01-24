import { Clock } from '../../../misc/main.js'

import PanelButton from './PanelButton.js'

export default props => PanelButton({
  ...props,
  content: Clock({ format: '%I:%M %p • %A %d' }),
})
