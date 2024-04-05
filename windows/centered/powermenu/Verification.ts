import { type ButtonProps } from 'types/widgets/button'

import RevealerWindow from 'windows/RevealerWindow'
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
          onClicked: () => App.toggleWindow('verification'),
          setup: (self: ButtonProps) => self.hook(App, (_, name: string, visible: boolean) => {
            setupCursorHover(self)
            if (name === 'verification' && visible)
              self.grab_focus()
          }),
        }),
        Widget.Button({
          label: 'Yes',
          setup: setupCursorHover,
          onClicked: () => Utils.exec(powermenu.cmd),
        }),
      ],
    }),
  ),
})
