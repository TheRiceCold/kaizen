import { type BoxProps } from 'types/widgets/box'

import Item from '../Item'
import Page from '../Page'
import Group from '../Group'
import Wallpaper from '../Wallpaper'

import options from 'options'
import icons from 'data/icons'
import { sh, dependencies } from 'lib/utils'

const {
  font,
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
    // cursor
    // cursorSize
    Item({
      opt: shader,
      type: 'enum',
      title: 'Hyprshade (Screen Shader)',
      enums: ['default', 'blue light', 'grayscale', 'invert'],
    }).hook(shader, (self: BoxProps) => {
      if (!dependencies('hyprshade')) {
        self.visible = false
        return
      }
      switch (shader.value) {
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
  ),
  Group(
    'UI',
    //Item({ opt: padding, title: 'Padding' }),
    //Item({ opt: spacing, title: 'Spacing' }),
    Item({ opt: radius, title: 'Roundness' }),
    //Item({ opt: border.width, title: 'Border Width' }),
    //Item({ opt: widget.opacity, title: 'Widget Opacity', max: 100 }),
    //Item({ opt: border.opacity, title: 'Border Opacity', max: 100 }),
    Item({ opt: font.default.size, title: 'Font Size' }),
    Item({ opt: font.default.name, title: 'Font Name', type: 'font' }),
  ),

  // Group('Custom Themes',),
)
