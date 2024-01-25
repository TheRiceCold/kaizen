import { Clock } from '../../../misc/main.js'

import PanelButton from './PanelButton.js'

export default PanelButton({
  content: Clock({ format: '%I:%M • %a %d' }),
})
