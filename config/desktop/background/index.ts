import { ToolsMenu } from 'desktop/dropdowns'
import { RoundedCorner } from 'widgets'
import options from 'options'

const { EventBox, Window } = Widget
const { theme, statusbar } = options

const showRoundedBorder = Utils.merge(
  [ theme.radius.bind(), statusbar.style.bind() ],
  (r: number, s: 'full' | 'separated') => r > 0 && s === 'full')

export default [
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

  // ROUNDED CORNERS
  // TopLeft
  Window({
    layer: 'top',
    name: 'cornertl',
    exclusivity: 'normal',
    anchor: ['top', 'left'],
    visible: showRoundedBorder,
    child: RoundedCorner('topleft', { className: 'corner' }),
  }),

  // TopRight
  Window({
    layer: 'top',
    name: 'cornertr',
    exclusivity: 'normal',
    anchor: ['top', 'right'],
    visible: showRoundedBorder,
    child: RoundedCorner('topright', { className: 'corner' }),
  }),

  // BottomLeft
  Window({
    layer: 'top',
    name: 'cornerbl',
    exclusivity: 'normal',
    anchor: ['bottom', 'left'],
    visible: showRoundedBorder,
    child: RoundedCorner('bottomleft', { className: 'corner-black' }),
  }),

  // BottomRight
  Window({
    layer: 'top',
    name: 'cornerbr',
    exclusivity: 'normal',
    anchor: ['bottom', 'right'],
    visible: showRoundedBorder,
    child: RoundedCorner('bottomright', { className: 'corner-black' }),
  }),
]
