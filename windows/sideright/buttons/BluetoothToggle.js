import { Widget, Utils, Bluetooth } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'

import icons from '../../../icons.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

const BluetoothIndicator = Widget.Stack({
  transition: 'slide_up_down',
  items: [
    ['true', FontIcon(icons.bluetooth.enabled)],
    ['false', FontIcon(icons.bluetooth.disabled)],
  ],
  setup: (self) => self.hook(Bluetooth, stack => {
    stack.shown = String(Bluetooth.enabled)
  }),
})

const onClicked = () => Utils.exec(`rfkill ${Bluetooth?.enabled ? 'block' : 'unblock'} bluetooth`)
const onSecondaryClickRelease = () => Utils.execAsync(['bash', '-c', 'blueberry &'])

export default Widget.Button({
  onClicked,
  onSecondaryClickRelease,
  setup: setupCursorHover,
  child: BluetoothIndicator,
  className: 'sidebar-iconbutton',
  tooltipText: 'Bluetooth | Right-click to configure',
  connections: [[ Bluetooth, btn => btn.toggleClassName('sidebar-button-active', Bluetooth?.enabled) ]],
})
