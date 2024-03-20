import Revealer from '../revealer'
import { sh } from 'lib/utils'
import { openToolsMenu } from './ToolsMenu.ts'
import { openWindowMenu } from './WindowMenu.ts'

const commands = [
  { label: 'Window ', onClicked: openWindowMenu, },
  { label: 'Tools ', onClicked: openToolsMenu },
  {
    label: 'Files',
    onClicked: () => sh(`nautilus`),
    onSecondaryClick: () => sh(`foot yazi`)
  },
  { label: 'Shortcuts', onClicked: () => App.openWindow('shortcuts') },
  { label: 'Settings', onClicked: () => { } },
]

export default () => Revealer('right', commands)
