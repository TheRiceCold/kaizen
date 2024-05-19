import RevealerWindow from 'desktop/RevealerWindow'
import powermenu from 'service/powermenu'

import { setupCursorHover } from 'misc/cursorhover'

export default RevealerWindow({
  name: 'verification',
  transition: 'crossfade',
  child: Widget.Box(
    { vertical: true, className: 'verification' },
    Widget.Box(
      { vertical: true, className: 'text-box' },
      Widget.Label({ className: 'title', label: powermenu.bind('title') }),
      Widget.Label({ className: 'desc', label: 'Are you sure?' }),
    ),
    Widget.Box({
      vpack: 'end',
      vexpand: true,
      homogeneous: true,
      className: 'buttons horizontal',
      children: [
        Widget.Button({
          label: 'No',
          setup: setupCursorHover,
          onClicked() { App.toggleWindow('verification') },
        }).hook(App, (self, name: string, visible: boolean) => {
          if (name === 'verification' && visible)
            self.grab_focus()
        }),
        Widget.Button({
          label: 'Yes',
          setup: setupCursorHover,
          onClicked: powermenu.exec,
        }),
      ],
    }),
  ),
})
