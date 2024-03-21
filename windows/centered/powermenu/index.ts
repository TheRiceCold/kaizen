import CenteredWindow from '../CenteredWindow'
import powermenu, { type Action } from 'service/powermenu'
import icons from 'data/icons'
import options from 'options'
import type Gtk from 'gi://Gtk?version=3.0'

const { layout, labels } = options.powermenu

const SysButton = (action: Action, label: string) => Widget.Button({
  onClicked: () => powermenu.action(action),
  child: Widget.Box({
    vertical: true,
    className: 'system-button',
    children: [
      Widget.Icon(icons.powermenu[action]),
      Widget.Label({ label, visible: labels.bind() }),
    ],
  }),
})

export default CenteredWindow({
  name: 'powermenu',
  transition: 'crossfade',
  child: Widget.Box<Gtk.Widget>({
    className: 'powermenu horizontal',
    setup: self => self.hook(layout, () => {
      self.toggleClassName('box', layout.value === 'box')
      self.toggleClassName('line', layout.value === 'line')
    }),
    children: layout.bind().as(layout => {
      switch (layout) {
        case 'line': return [
          SysButton('shutdown', 'Shutdown'),
          SysButton('logout', 'Log Out'),
          SysButton('reboot', 'Reboot'),
          SysButton('sleep', 'Sleep'),
        ]
        case 'box': return [
          Widget.Box(
            { vertical: true },
            SysButton('shutdown', 'Shutdown'),
            SysButton('logout', 'Log Out'),
          ),
          Widget.Box(
            { vertical: true },
            SysButton('reboot', 'Reboot'),
            SysButton('sleep', 'Sleep'),
          ),
        ]
      }
    }),
  }),
})
