import { type BoxProps } from 'types/widgets/box'
import { Title, Item } from '..'
import Wallpaper from './Wallpaper'

import options from 'options'
import { dependencies, sh } from 'lib/utils'

const { 
  font, autotheme,
  theme: { shadows }, 
  hyprland: { shader, gapsWhenOnly },
} = options

export default Widget.Box(
  { vertical: true, className: 'general-stack' },
  Title('General', 'right', 'themes'),

  Wallpaper(),
  Item('Auto generate colorscheme', { opt: autotheme }),
  Item('Shadows', { opt: shadows }),
  Item('Gaps when only', { opt: gapsWhenOnly }),
  Item('Screen Shader', { 
    opt: shader, 
    type: 'enum', 
    enums: [ 'default', 'blue light', 'grayscale', 'invert' ] 
  })
    .hook(shader, (self: BoxProps) => {
      if (!dependencies('hyprshade')) { self.visible = false; return }
      switch(shader.value) {
        case 'grayscale':
          sh('hyprshade on grayscale')
          break
        case 'invert':
          sh('hyprshade on invert-colors')
          break
        case 'blue light':
          sh('hyprshade on blue-light-filter')
          break
        default:
          sh('hyprshade off') 
          break
      }
    }),
  Item('Font', { opt: font.default.name, type: 'font' }),
  Item('Font Size', { opt: font.default.size }),
)
