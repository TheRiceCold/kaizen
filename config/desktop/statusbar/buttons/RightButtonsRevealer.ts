import screenTools from 'service/screen'

import { gromit } from 'lib/utils'
import { toggleWidget } from 'lib/globals'

import ButtonRevealer from '../ButtonRevealer'

export default ButtonRevealer('left', [
  { label: 'Draw', onClicked() { gromit.start() } },
  { label: 'Zoom', onClicked() { screenTools.zoom() } },
  { label: 'Color', onClicked() { toggleWidget('color') } },
  { label: 'Keyboard', onClicked() { toggleWidget('keyboard') } },
  { label: 'Recorder', onClicked() { } },
  { label: 'Screenshot', onClicked() { } }
])
