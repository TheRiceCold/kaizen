import Revealer from '../revealer'

import { 
  openDevsMenu,
  openWindowMenu,
  openTerminalMenu,
} from './menus'

const commands = [
  { label: 'Window ', onClicked: openWindowMenu, },
  { label: 'Terminal ', onClicked: openTerminalMenu },
  { label: 'Dev Tools ', onClicked: openDevsMenu },
  { label: 'Shortcuts', onClicked: () => App.openWindow('shortcuts') },
  { label: 'Help', onClicked: () =>  { }}, // TODO: Create documentation
]

export default () => Revealer('right', commands)
