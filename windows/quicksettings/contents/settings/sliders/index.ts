import {
  Brightness,
  Volume,
  Microphone,
  AppMixer,
  SinkSelector
} from './widgets'

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

export default Widget.Box({
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
})
