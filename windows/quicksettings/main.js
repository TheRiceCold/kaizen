import { Widget } from '../../imports.js'
import { PopupWindow } from '../../misc/main.js'

import DND from './widgets/DND.js'
import Media from './widgets/Media.js'
import Header from './widgets/Header.js'
import MicMute from './widgets/MicMute.js'
import Brightness from './widgets/Brightness.js'
import { ThemeToggle, ThemeSelector } from './widgets/Theme.js'
import { NetworkToggle, WifiSelection } from './widgets/Network.js'
import { BluetoothToggle, BluetoothDevices } from './widgets/Bluetooth.js'
// import { ProfileToggle, ProfileSelector } from './widgets/AsusProfile.js'
import { Volume, Microhone, SinkSelector, AppMixer } from './widgets/Volume.js'

import options from '../../options.js'

const Row = (toggles = [], menus = []) => Widget.Box({
  vertical: true,
  children: [
    ...menus,
    Widget.Box({ className: 'row horizontal', children: toggles }),
  ],
})

const Homogeneous = toggles => Widget.Box({
  homogeneous: true,
  children: toggles,
})

export default () => PopupWindow({
  name: 'quicksettings',
  connections: [[options.bar.position, self => {
    self.anchor = ['right', options.bar.position.value]
    if (options.bar.position.value === 'top') 
      self.transition = 'slide_down'
    if (options.bar.position.value === 'bottom') 
      self.transition = 'slide_up'
  }]],
  child: Widget.Box({
    vertical: true,
    children: [
      Header(),
      Widget.Box({
        className: 'sliders-box vertical',
        vertical: true,
        children: [
          Row([Volume()], [SinkSelector(), AppMixer()]),
          Microhone(),
          Brightness(),
        ],
      }),
      Row(
        [Homogeneous([ NetworkToggle(), BluetoothToggle() ]), DND() ],
        [ WifiSelection(), BluetoothDevices() ],
      ),
      Row([
        Homogeneous([
          // ProfileToggle(),
          ThemeToggle()
        ]), MicMute()
      ], [
        // ProfileSelector(), 
        ThemeSelector()
      ]),
      Media(),
    ],
  }),
})
