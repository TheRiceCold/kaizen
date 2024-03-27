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
    onSecondaryClick: () => sh(`foot yazi`),
    tooltipText: 'Right Click | Terminal (yazi)'
  },
  { label: 'Shortcuts', onClicked: () => App.openWindow('shortcuts') },
]

export default () => Revealer('right', commands)
