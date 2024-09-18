import { type ButtonProps } from 'types/widgets/button'

import powermenu from 'service/powermenu'

import RevealerWindow from 'desktop/RevealerWindow'
import { ButtonLabel } from 'widgets'

export default RevealerWindow({
  name: 'verification',
  transition: 'crossfade',
  child: Widget.Box(
    { vertical: true, className: 'verification' },
    Widget.Label({ className: 'title', label: powermenu.bind('title') }),
    Widget.Box({
      vpack: 'end',
      vexpand: true,
      homogeneous: true,
      className: 'buttons horizontal',
      children: [
        ButtonLabel('No', () => App.toggleWindow('verification'))
          .hook(App, (self: ButtonProps, name: string, visible: boolean) => {
            if (name === 'verification' && visible)
              self.grab_focus()
          }), ButtonLabel('Yes', powermenu.exec)
      ]
    })
  )
})
