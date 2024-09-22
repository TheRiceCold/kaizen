import ToolsMenu from 'desktop/dropdowns/tools'
import { RoundedCorner } from 'widgets'
import options from 'options'

const { EventBox, Window } = Widget
const { radius } = options.theme

export default [
  // TopLeft Rounded Corner
  Window({
    layer: 'top',
    name: 'cornertl',
    exclusivity: 'normal',
    anchor: ['top', 'left'],
    visible: radius.bind().as((r: number) => r > 0),
  }, RoundedCorner('topleft', { className: 'corner' })),

  // Actions Menu
  Window({
    popup: false,
    visible: true,
    layer: 'bottom',
    focusable: false,
    name: 'bgoverlay',
    anchor: ['top', 'bottom', 'left', 'right'],
    child: EventBox({ onSecondaryClick: (_, e) => ToolsMenu(e) }),
  }),

  // TopRight Rounded Corner
  Window({
    layer: 'top',
    name: 'cornertr',
    exclusivity: 'normal',
    anchor: ['top', 'right'],
    visible: radius.bind().as((r: number) => r > 0),
  }, RoundedCorner('topright', { className: 'corner' })),
]
