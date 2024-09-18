import DropdownMenu from 'desktop/dropdowns/background'
import { RoundedCorner } from 'misc/roundedcorner'
import options from 'options'

const { radius } = options.theme

export default [
  Widget.Window({
    layer: 'top',
    name: 'cornertl',
    exclusivity: 'normal',
    anchor: ['top', 'left'],
    visible: radius.bind().as((r: number) => r > 0),
    child: RoundedCorner('topleft', { className: 'corner' }),
  }),

  Widget.Window({
    popup: false,
    visible: true,
    layer: 'bottom',
    focusable: false,
    name: 'bgoverlay',
    anchor: ['top', 'bottom', 'left', 'right'],
    child: Widget.EventBox({ onSecondaryClick: (_, event) => DropdownMenu(event) }),
  }),

  Widget.Window({
    layer: 'top',
    name: 'cornertr',
    exclusivity: 'normal',
    anchor: ['top', 'right'],
    visible: radius.bind().as((r: number) => r > 0),
    child: RoundedCorner('topright', { className: 'corner' }),
  }),
]
