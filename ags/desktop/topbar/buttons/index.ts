import BarButton from '../BarButton'
import ToolsMenu from 'desktop/dropdowns/tools'
import SessionMenu from 'desktop/dropdowns/session'

import options from 'options'

import { sh } from 'lib/utils'
import { showWidget } from 'lib/variables'
import { toggleWidget } from 'lib/globals'

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

export const AiButton = BarButton({
  label: 'Ask',
  onClicked(self: typeof BarButton) {
    toggleWidget('ask')
    self.toggleClassName('active', showWidget.ask.value)
  },
})

export const RunButton = BarButton({
  label: 'Run',
  window: 'run',
  onClicked() {
    const cmd = options.run.execCmd.value
    if (cmd.length > 0) sh(cmd)
    else App.toggleWindow('run')
  },
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
