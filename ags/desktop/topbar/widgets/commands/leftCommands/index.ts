import Revealer from '../Revealer'

import { openDevMenu } from './menus/DevMenu'
import { openWindowMenu } from './menus/WindowMenu'

const commands = [
  { label: 'Window ', onClicked: openWindowMenu, },
  { label: 'Developer Tools ', onClicked: openDevMenu },
  { label: 'Shortcuts', onClicked() { App.openWindow('shortcuts') } },
  {
    label: 'Help',
    onClicked() { },
    cursor: 'pointer',
  }, // TODO: Create documentation
]

export default Revealer('right', commands)
