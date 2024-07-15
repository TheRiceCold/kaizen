import BarButton from '../BarButton'

import options from 'options'

import { showWidget } from 'lib/variables'
import { toggleWidget } from 'lib/globals'
import sh from 'service/sh'

export const LogoButton = BarButton({
  label: '󰚀',
  window: 'dashboard',
  className: 'launcher-button',
  onClicked() { App.toggleWindow('dashboard') },
})

export const AiButton: Button = BarButton({
  label: 'Ask',
  onClicked(self: typeof BarButton) {
    toggleWidget('ask')
    self.toggleClassName('active', showWidget['ask'].value)
  },
})

export const RunButton = BarButton({
  label: 'Run', window: 'run',
  onClicked() {
    let cmd = options.run.execCmd
    if (cmd.length > 0) {
      Utils.execAsync(['bash', '-c', cmd]).catch((err: any) => {
        console.error(cmd, err)
        return ''
      })
    } else {
      App.toggleWindow('run')
    }
  },
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
export { default as SessionButton } from './SessionButton'
export { default as QuickSettingsButton } from './QuickSettingsButton'
