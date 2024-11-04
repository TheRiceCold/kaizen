import Item from '../Item'
import Page from '../Page'
import Group from '../Group'
import Wallpaper from '../Wallpaper'

import options from 'options'
import icons from 'data/icons'

const {
  font,
  avatar,
  theme: {
    auto,
    blur,
    scheme,
    radius,
    border,
    shadows,
  },
  hyprland: { shader }
} = options

export default Page(
  'General',
  icons.ui.settings,
  Group(
    '',
    Wallpaper,
    Item({ opt: avatar, title: 'Avatar', type: 'img' }),
    Item({ opt: auto, title: 'Auto Generate Color Scheme' }),
    Item({
      opt: scheme,
      type: 'enum',
      title: 'Color Scheme',
      enums: ['dark', 'light'],
    }),
    Item({
      opt: shader,
      type: 'enum',
      title: 'Shader',
      enums: ['default', 'bluelight', 'vibrance', 'grayscale', 'invert', 'CRT'],
    })
  ),
  Group(
    'UI',
    Item({ opt: radius, title: 'Roundness' }),
    Item({ opt: shadows, title: 'Shadows' }),
    Item({ opt: border.width, title: 'Border Width' }),
    Item({ opt: border.opacity, title: 'Border Opacity', max: 100 }),
    Item({ opt: blur, title: 'Blur', note: '0 to disable', max: 70 }),
    //Item({ opt: widget.opacity, title: 'Widget Opacity', max: 100 }),
    Item({ opt: font.default.size, title: 'Font Size' }),
    Item({ opt: font.default.name, title: 'Font Name', type: 'font' }),
  ),

  // Group('Custom Themes',),
)
