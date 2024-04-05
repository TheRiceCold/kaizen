import { type BoxProps } from 'types/widgets/box'
import { Title, Item } from '..'
import Wallpaper from './Wallpaper'

import options from 'options'
import { dependencies, sh } from 'lib/utils'

const { 
  font, autotheme,
  theme: { shadows }, 
  hyprland: { shade, gapsWhenOnly },
} = options

export default Widget.Box(
  { vertical: true, className: 'general-stack' },
  Title('General', 'right', 'themes'),

  Wallpaper(),
  Item('Auto generate colorscheme', { opt: autotheme }),
  Item('Shadows', { opt: shadows }),
  Item('Gaps when only', { opt: gapsWhenOnly }),
  Item('Blue light filter', { opt: shade.blueLight })
    .hook(shade.blueLight, (self: BoxProps) => {
      if (!dependencies('hyprshade')) { self.visible = false; return }
      sh(`hyprshade ${shade.blueLight.value ? 'on blue-light-filter' : 'off'}`)
    }),
  Item('Font', { opt: font.default.name, type: 'font' }),
  Item('Font Size', { opt: font.default.size }),
)
