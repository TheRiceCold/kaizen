import popups from 'service/popups'

import { ToolsMenu, SessionMenu } from 'desktop/dropdowns'
import BarButton from '../BarButton'

const systemtray = await Service.import('systemtray')

export const TraySeparator = Widget.Separator({
  vertical: true,
  visible: systemtray.bind('items').as(items => items.length > 0)
})

export const LogoButton = BarButton({
  label: '󰚀',
  window: 'dashboard',
  className: 'launcher-button',
  onClicked() { App.toggleWindow('dashboard') },
})

export const AskButton = BarButton({
  label: 'Ask',
  onClicked(self: typeof BarButton) {
    popups.toggle('ask')
    self.toggleClassName('active', popups['ask-shown'])
  },
})

export const RunButton = BarButton({
  label: 'Run',
  window: 'run',
  onClicked() { App.toggleWindow('run') },
})

export const ToolsButton = BarButton({ label: 'Tools', onClicked: ToolsMenu })

export const SettingsButton = BarButton({
  label: 'Settings',
  window: 'settings-dialog',
  onClicked() {
    App.closeWindow('dashboard')
    App.openWindow('settings-dialog')
  },
})

export const SessionButton = BarButton({
  label: '',
  onClicked: SessionMenu,
  className: 'session-button',
})

export { default as Tray } from './Tray'
export { default as Indicator } from './indicator'
export { default as Workspaces } from './workspaces'
export { default as DateButton } from './DateButton'
export { default as QuickSettingsButton } from './QuickSettingsButton'
export { default as LeftButtonsRevealer } from './LeftButtonsRevealer'
export { default as RightButtonsRevealer } from './RightButtonsRevealer'
