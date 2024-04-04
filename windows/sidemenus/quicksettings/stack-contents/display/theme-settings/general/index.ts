import { Title, Item } from '..'
import Wallpaper from './Wallpaper'

import options from 'options'

const { 
  font, autotheme,
  theme: { shadows }, 
  hyprland: { gapsWhenOnly },
} = options

export default Widget.Box(
  { vertical: true, className: 'general-stack' },
  Title('General', 'right', 'themes'),

  Wallpaper(),
  Item('Auto generate colorscheme', { opt: autotheme }),
  Item('Shadows', { opt: shadows }),
  Item('Gaps when only', { opt: gapsWhenOnly }),
  Item('Font', { opt: font.default.name, type: 'font' }),
  Item('Font Size', { opt: font.default.size }),
)
