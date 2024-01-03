import { App, Widget } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'
import icons from '../../../icons.js'

export default Widget.Button({
  hpack: 'end',
  child: FontIcon(icons.lock),
  tooltipText: 'Lock Screen',
  className: 'sidebar-iconbutton',
  onClicked: () => {
    // App.toggleWindow('session')
    App.closeWindow('sideright')
  },
  setup: btn => setupCursorHover(btn)
})
