import { App, Utils, Widget } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

export default () => Widget.Button({
  hpack: 'end',
  child: FontIcon(''),
  tooltipText: 'Open Settings',
  className: 'sidebar-iconbutton',
  setup: btn => setupCursorHover(btn),
  onClicked: () => {
    Utils.execAsync(['bash', '-c', 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center', '&'])
    App.toggleWindow('sideright')
  },
})
