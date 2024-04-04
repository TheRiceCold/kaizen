import { type SpinButtonProps } from 'types/widgets/spinbutton'

import { Title, Item } from './index'

import options from 'options'

const { theme: { blur, border, radius }, font } = options

export default Widget.Box({
  vertical: true,
  children: [
    Title('Settings and Adjustments', 'right', 'colorschemes'),

    Item('Wallpaper', [
      Widget.FileChooserButton({ }),
      Widget.Button({ label: 'random' }),
    ]),

    Item('Auto generate colorscheme', [
      Widget.Switch({ }),
    ]),

    Item('Shadows', [ 
      Widget.Switch({ }),
    ]),

    Item('Gaps when only', [
      Widget.Switch({ }),
    ]),

    Item('Font', [
      Widget.FontButton({
        useSize: false,
        showSize: false,
        setup: self => self
          .hook(font.default, () => self.font = font.default.value as string)
          .on('font-set', ({ font }) => font.default.value = font!
            .split(' ').slice(0, -1).join(' ')),
      })
    ]),

    Item('Border', [
      Widget.SpinButton({
        setup(self: SpinButtonProps) {
          self.set_range(0, 50)
          self.set_increments(1, 5)
          self.on('value-changed', () => border.width.value = self.value)
          self.hook(border.width, () => self.value = border.width.value as number)
        },
      })
    ]),

    Item('Roundness', [
      Widget.SpinButton({
        setup(self: SpinButtonProps) {
          self.set_range(0, 50)
          self.set_increments(1, 5)
          self.on('value-changed', () => radius.value = self.value)
          self.hook(radius, () => self.value = radius.value as number)
        },
      })
    ]),

    Item('Blur', [
      Widget.SpinButton({
        setup(self: SpinButtonProps) {
          self.set_range(0, 50)
          self.set_increments(1, 5)
          self.on('value-changed', () => blur.value = self.value)
          self.hook(blur, () => self.value = blur.value as number)
        },
      })
    ]),
  ]
})
