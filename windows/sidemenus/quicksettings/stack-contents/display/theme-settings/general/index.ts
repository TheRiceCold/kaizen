import { Title, Item } from '..'
import Wallpaper from './Wallpaper'

import options from 'options'

const { 
  font, autotheme,
  hyprland: { gapsWhenOnly },
  theme: { blur, border, radius, shadows, widget }, 
} = options

export default Widget.Box({
  vertical: true,
  children: [
    Title('Settings and Adjustments', 'right', 'colorschemes'),

    Wallpaper(),
    Item('Auto generate colorscheme', { opt: autotheme }),
    Item('Shadows', { opt: shadows }),
    Item('Gaps when only', { opt: gapsWhenOnly }),
    Item('Font', { opt: font.default.name, type: 'font' }),
    Item('Border', { opt: border.width }),
    Item('Roundness', { opt: radius }),
    Item('Blur', { opt: blur, max: 50 }),
    Item('Opacity', { opt: widget.opacity }),
  ]
})
