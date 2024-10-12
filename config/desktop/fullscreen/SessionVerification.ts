import { type ButtonProps } from 'types/widgets/button'

import powermenu from 'service/powermenu'

import { ButtonLabel, VBox, RevealerWindow } from 'widgets'

const { Box, Label } = Widget

export default RevealerWindow({
  name: 'verification',
  transition: 'crossfade',
  child: VBox(
    { className: 'verification' },
    Label({ className: 'title' }).bind('label', powermenu, 'title'),
    Box({
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
