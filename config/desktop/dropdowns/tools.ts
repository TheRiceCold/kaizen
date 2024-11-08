import popups, { PopType } from 'service/popups'

import { gromit } from 'lib/utils'
import { Menu, MenuItemLabel as Item } from 'widgets'

const toggle = (pop: PopType) => popups.toggle(pop)

export default widget => Menu(widget, [
  Item('󰽉 Draw', () => gromit.start()), // its asynchronous
  Item(' Zoom', () => toggle('zoom')),
  Item(' Color', () => toggle('color')),
  Item(' Capture', () => toggle('capture')),
  Item(' Pomodoro', () => toggle('pomodoro')),
  Item('  Keyboard', () => toggle('keyboard')),
])
