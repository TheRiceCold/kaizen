import BarButton from '../BarButton'

import options from 'options'
import { clock } from 'lib/variables'

const { interval, format, action } = options.bar.datemenu

export const Launcher = BarButton({
  label: '󰚀',
  window: 'launcher',
  className: 'launcher-button',
  onClicked() { App.toggleWindow('launcher') },
})

export const Power = BarButton({
  label: '',
  window: 'powermenu',
  className: 'power-button',
  onClicked: options.bar.power.action.bind(),
})

export const Date = BarButton({
  window: 'datemenu',
  className: 'datemenu',
  onClicked: action.bind(),
  label: Utils.derive(
    [clock(interval), format],
    (c, f) => c.format(f) || ''
  ).bind(),
})

export { default as Tray } from './Tray'
export { default as Middle } from './middle'
export { default as Workspaces } from './workspaces'
export { default as Control } from './ControlButton'
export { default as LeftCommands } from './commands/leftCommands'
export { default as RightCommands } from './commands/rightCommands'
