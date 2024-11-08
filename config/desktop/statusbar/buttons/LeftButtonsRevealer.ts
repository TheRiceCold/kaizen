import popups from 'service/popups'

import ButtonRevealer from '../ButtonRevealer'

export default ButtonRevealer('right', [
  { label: 'Ask', onClicked() { popups.toggle('ask') }, },
  { label: 'Run', onClicked() { App.toggleWindow('run') }, },
  { label: 'Settings',
    onClicked() {
      App.closeWindow('dashboard')
      App.openWindow('settings-dialog')
    },
  },
])
