import Revealer from '../revealer'

import { openDevMenu } from './menus/DevMenu'
import { openWindowMenu } from './menus/WindowMenu'
import { setupCursorHoverInfo } from 'misc/cursorhover'

const commands = [
  { label: 'Window ', onClicked: openWindowMenu, },
  { label: 'Developer Tools ', onClicked: openDevMenu },
  { label: 'Shortcuts', onClicked: () => App.openWindow('shortcuts') },
  { 
    label: 'Help', 
    onClicked: () =>  { },
    setup: setupCursorHoverInfo,
  }, // TODO: Create documentation
]

export default () => Revealer('right', commands)
