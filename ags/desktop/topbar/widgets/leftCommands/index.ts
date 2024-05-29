import Revealer from './Revealer'

import { openDevMenu } from './menus/DevMenu'
import { openWindowMenu } from './menus/WindowMenu'

import { sh } from 'lib/utils'

const commands = [
  { label: 'File', onClicked() { sh('nautilus') } },
  { label: 'Developer', onClicked: openDevMenu },
  { label: 'Run', onClicked() { } },
  { label: 'Window', onClicked: openWindowMenu },
  { label: 'Help', onClicked() { }, cursor: 'help'  },
]

export default Revealer('right', commands)
