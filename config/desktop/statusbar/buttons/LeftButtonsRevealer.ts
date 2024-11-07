import { toggleWidget } from 'lib/globals'

import ButtonRevealer from '../ButtonRevealer'

export default ButtonRevealer('right', [
  { label: 'Ask', onClicked() { toggleWidget('ask') }, },
  { label: 'Run', onClicked() { App.toggleWindow('run') }, },
  { label: 'Settings',
    onClicked() {
      App.closeWindow('dashboard')
      App.openWindow('settings-dialog')
    },
  },
])
