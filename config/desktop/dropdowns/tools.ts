import popups, { PopType } from 'service/popups'
import screen from 'service/screen'

import { Menu, MenuItemLabel as Item } from 'widgets'

const toggle = (pop: PopType) => popups.toggle(pop)

export default widget => Menu(widget, [
  Item(' Capture', () => toggle('capture')),
  Item(' Magnify', () => toggle('magnify')),
  Item('󰽉 Draw', screen.draw),
  Item(' Color', () => toggle('color')),
  Item(' Pomodoro', () => toggle('pomodoro')),
  Item('  Keyboard', () => toggle('keyboard')),
])
