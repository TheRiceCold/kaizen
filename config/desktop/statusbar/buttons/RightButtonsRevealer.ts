import popups, { PopType } from 'service/popups'

import { gromit } from 'lib/utils'

import ButtonRevealer from '../ButtonRevealer'

const toggle = (pop: PopType) => popups.toggle(pop)

export default ButtonRevealer('left', [
  { label: 'Capture', onClicked() { toggle('capture') } },
  { label: 'Draw', onClicked() { gromit.start() } },
  { label: 'Zoom', onClicked() { toggle('zoom') } },
  { label: 'Color', onClicked() { toggle('color') } },
  { label: 'Keyboard', onClicked() { toggle('keyboard') } },
])
