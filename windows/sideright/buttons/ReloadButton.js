import { App, Utils, Widget } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

export default () => Widget.Button({
  hpack: 'end',
  tooltipText: 'Reload Hyprland',
  className: 'sidebar-iconbutton',
  onClicked: () => {
    Utils.execAsync(['bash', '-c', 'hyprctl reload &'])
    App.toggleWindow('sideright')
  },
  child: FontIcon('󰑓'),
  setup: btn =>  setupCursorHover(btn)
})
