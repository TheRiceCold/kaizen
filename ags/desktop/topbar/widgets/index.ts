import BarButton from '../BarButton'

import options from 'options'
import { clock } from 'lib/variables'
import { showWidget } from 'lib/variables'

const { datemenu } = showWidget
const { interval, format } = options.bar.datemenu

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
  className: 'datemenu',
  onClicked(self) {
    datemenu.value = !datemenu.value
    self.toggleClassName('active', datemenu.value)
  },
  label: Utils.derive(
    [clock(interval), format],
    (c, f) => c.format(f) || ''
  ).bind(),
})

export { default as Tray } from './Tray'
export { default as Indicator } from './indicator'
export { default as Workspaces } from './workspaces'
export { default as Control } from './ControlButton'
export { default as LeftCommands } from './leftCommands'
