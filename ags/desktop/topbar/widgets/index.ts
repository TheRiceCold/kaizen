import BarButton from '../BarButton'

import { showWidget } from 'lib/variables'

export const LogoButton = BarButton({
  label: '󰚀',
  window: 'dashboard',
  className: 'launcher-button',
  onClicked() { App.toggleWindow('dashboard') },
})

export const AiButton = BarButton({
  label: 'Ask',
  onClicked(self) {
    toggleWidget('ask')
    self.toggleClassName('active', showWidget['ask'].value)
  },
})

export const RunButton = BarButton({
  label: 'Run', window: 'run',
  onClicked() { App.toggleWindow('run') },
})

export const ShortcutsButton = BarButton({
  label: 'Shortcuts',
  window: 'shortcuts',
  tooltipText: 'Toggle keybind shortcuts',
  onClicked() { App.toggleWindow('shortcuts') }
})

export { default as Tray } from './Tray'
export { default as Indicator } from './indicator'
export { default as Workspaces } from './Workspaces'
export { default as DateButton } from './DateButton'
export { default as WindowButton } from './WindowButton'
export { default as QuickSettingsButton } from './QuickSettingsButton'
