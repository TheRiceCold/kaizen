import BarButton from '../BarButton'

import { showWidget } from 'lib/variables'

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

export const KeysButton = BarButton({
  label: 'Keys',
  window: 'shortcuts',
  tooltipText: 'Toggle keybind shortcuts',
  onClicked() { App.toggleWindow('shortcuts') }
})

export { default as Tray } from './Tray'
export { default as Indicator } from './indicator'
export { default as RunButton } from './RunButton'
export { default as Workspaces } from './Workspaces'
export { default as DateButton } from './DateButton'
export { default as WindowButton } from './WindowButton'
export { default as ControlButton } from './ControlButton'
