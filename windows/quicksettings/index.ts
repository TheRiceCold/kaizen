import type Gtk from 'gi://Gtk?version=3.0'
import { Header } from './widgets/Header'
import PopupWindow from '../PopupWindow'
import {
  Brightness,
  Media, MicMute,
  DarkModeToggle, DND,
  NetworkToggle, WifiSelection,
  BluetoothToggle, BluetoothDevices,
  Volume, Microphone, AppMixer, SinkSelector
} from './widgets'
import options from 'options'

const { bar, quicksettings } = options
const media = (await Service.import('mpris')).bind('players')
const layout = Utils.derive([bar.position, quicksettings.position], (bar, qs) => `${bar}-${qs}` as const)

const Row = (
  toggles: Array<() => Gtk.Widget> = [],
  menus: Array<() => Gtk.Widget> = [],
) => Widget.Box({
  vertical: true,
  children: [
    Widget.Box({
      homogeneous: true,
      className: 'row horizontal',
      children: toggles.map(w => w()),
    }),
    ...menus.map(w => w()),
  ],
})

const Settings = () => Widget.Box({
  vertical: true,
  className: 'quicksettings vertical',
  css: quicksettings.width.bind().as(w => `min-width: ${w}px;`),
  children: [
    Header(),
    Widget.Box({
      className: 'sliders-box vertical',
      vertical: true,
      children: [
        Row(
          [ Volume ],
          [ SinkSelector, AppMixer ]
        ),
        Microphone(),
        Brightness(),
      ],
    }),
    Row(
      [ NetworkToggle, BluetoothToggle ],
      [ WifiSelection, BluetoothDevices ]
    ),
    Row([ DarkModeToggle ]),
    Row([ MicMute, DND ]),
    Widget.Box({
      child: Media(),
      visible: media.as(l => l.length > 0),
    }),
  ],
})

const QuickSettings = () => PopupWindow({
  child: Settings(),
  layout: layout.value,
  name: 'quicksettings',
  exclusivity: 'exclusive',
  transition: bar.position.bind().as(pos => pos === 'top' ? 'slide_down' : 'slide_up'),
})

export function setupQuickSettings() {
  App.addWindow(QuickSettings())
  layout.connect('changed', () => {
    App.removeWindow('quicksettings')
    App.addWindow(QuickSettings())
  })
}
