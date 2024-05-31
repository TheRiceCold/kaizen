import BarButton from '../BarButton'

import options from 'options'
import { clock } from 'lib/variables'
import { showWidget } from 'lib/variables'
import { openRunMenu } from './menus/RunMenu'
import { openWindowMenu } from './menus/WindowMenu'

const { interval, format } = options.bar.datemenu

export const LauncherButton = BarButton({
  label: '󰚀',
  window: 'launcher',
  className: 'launcher-button',
  onClicked() { App.toggleWindow('launcher') },
})

export const AiButton = BarButton({
  label: 'AI',
  onClicked(self) {
    toggleWidget('ai-tools')
    self.toggleClassName('active', showWidget['ai-tools'].value)
  },
})
export const DashboardButton = BarButton({
  label: 'Dashboard',
  window: 'dashboard',
  onClicked() { App.toggleWindow('dashboard') }
})
export const RunButton = BarButton({ label: 'Run', onClicked: openRunMenu })
export const WindowButton = BarButton({ label: 'Window', onClicked: openWindowMenu })

export const DateButton = BarButton({
  className: 'datemenu',
  onClicked(self) {
    toggleWidget('datemenu')
    self.toggleClassName('active', showWidget.datemenu.value)
  },
  label: Utils.derive(
    [clock(interval), format],
    (c, f) => c.format(f) || ''
  ).bind(),
})

export const PowerButton = BarButton({
  label: '',
  window: 'powermenu',
  className: 'power-button',
  onClicked: options.bar.power.action.bind(),
})

export { default as Tray } from './Tray'
export { default as Indicator } from './indicator'
export { default as Workspaces } from './Workspaces'
export { default as ControlButton } from './ControlButton'
