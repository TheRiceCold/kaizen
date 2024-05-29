import Revealer from '../Revealer'

import { openDevMenu } from './menus/DevMenu'
import { openWindowMenu } from './menus/WindowMenu'

const commands = [
  { label: 'Window ', onClicked: openWindowMenu, },
  { label: 'Developer Tools ', onClicked: openDevMenu },
]

export default Revealer('right', commands)
