import { type ButtonProps } from 'types/widgets/button'

import powermenu from 'service/powermenu'

import RevealerWindow from 'desktop/RevealerWindow'
import { ButtonLabel, VBox } from 'widgets'

export default RevealerWindow({
  name: 'verification',
  transition: 'crossfade',
  child: VBox(
    { className: 'verification' },
    Widget.Label({ className: 'title' }).bind('label', powermenu, 'title'),
    Widget.Box({
      vpack: 'end',
      vexpand: true,
      homogeneous: true,
      className: 'buttons horizontal',
    }, ButtonLabel('No', () => App.toggleWindow('verification'))
      .hook(App, (self: ButtonProps, name: string, visible: boolean) => {
        if (name === 'verification' && visible)
          self.grab_focus()
      }), ButtonLabel('Yes', powermenu.exec))
  )
})
