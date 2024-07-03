import {
  LogoButton,
  Workspaces,
  AiButton,
  RunButton,
  WindowButton,
  ShortcutsButton,
  Indicator,
  Tray,
  ControlButton,
  DateButton,
} from './widgets'
import DropdownMenu from 'desktop/dropdowns/background'

const startWidget = Widget.Box(
  { hpack: 'start', className: 'side-items' },
  LogoButton,
  Workspaces,
  Widget.Separator({ vertical: true }),
  AiButton,
  RunButton,
  WindowButton,
  ShortcutsButton,
)

const Content = Widget.CenterBox({
  css: 'min-width: 2px; min-height: 2.5rem;',
  startWidget,
  centerWidget: Indicator,
  endWidget: Widget.Box(
    { hpack: 'end', className: 'side-items' },
    Tray,
    Widget.Separator({ vertical: true }),
    ControlButton,
    Widget.Separator({ vertical: true }),
    DateButton,
  )
})

export default Widget.Window({
  name: 'topbar',
  keymode: 'none',
  className: 'topbar',
  exclusivity: 'exclusive',
  anchor: [ 'top', 'right', 'left' ],
  child: Widget.EventBox({
    child: Content,
    onSecondaryClick(_, event) { DropdownMenu(event) },
  }),
})
