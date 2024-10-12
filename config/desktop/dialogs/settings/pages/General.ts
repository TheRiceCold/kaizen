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
    scheme,
    radius,
    blur,
    shadows,
  },
  hyprland: { gaps, gapsWhenOnly, shader, inactiveBorder },
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
  ),
  Group(
    'Hyprland',
    Item({ opt: gaps, title: 'Gaps' }),
    Item({ opt: shadows, title: 'Shadows' }),
    Item({ opt: gapsWhenOnly, title: 'Gaps When Only' }),
    Item({ opt: blur, title: 'Blur', note: '0 to disable', max: 70 }),
    Item({
      opt: inactiveBorder,
      type: 'color',
      title: 'Inactive Border Color',
    }),
    Item({
      opt: shader,
      type: 'enum',
      title: 'Shaders',
      enums: ['default', 'CRT', 'grayscale', 'invert', 'bluelight', 'vibrance'],
    })
    // cursorTheme
    // cursorSize
  ),
  Group(
    'UI',
    Item({ opt: radius, title: 'Roundness' }),
    //Item({ opt: border.width, title: 'Border Width' }),
    //Item({ opt: widget.opacity, title: 'Widget Opacity', max: 100 }),
    //Item({ opt: border.opacity, title: 'Border Opacity', max: 100 }),
    Item({ opt: font.default.size, title: 'Font Size' }),
    Item({ opt: font.default.name, title: 'Font Name', type: 'font' }),
  ),

  // Group('Custom Themes',),
)
