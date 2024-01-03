import { App, Widget } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

export default Widget.Button({
  hpack: 'end',
  child: FontIcon(''),
  tooltipText: 'Session',
  className: 'sidebar-iconbutton',
  onClicked: () => {
    App.toggleWindow('powermenu')
    App.closeWindow('sidebar')
  },
  setup: btn => setupCursorHover(btn)
})
