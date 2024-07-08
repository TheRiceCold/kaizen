import {
  LogoButton,
  Workspaces,
  AiButton,
  RunButton,
  WindowButton,
  SessionButton,
  // ShortcutsButton,
  Indicator,
  Tray,
  QuickSettingsButton,
  DateButton,
} from './widgets'
import DropdownMenu from 'desktop/dropdowns/background'

const Separator = Widget.Separator({ vertical: true })

const startWidget = Widget.Box(
  { hpack: 'start', className: 'side-items' },
  LogoButton,
  Workspaces,
  Separator,
  AiButton,
  RunButton,
  WindowButton,
  SessionButton,
  /* ShortcutsButton, */
)

const endWidget = Widget.Box(
  { hpack: 'end', className: 'side-items' },
  Tray, Separator, QuickSettingsButton, Separator, DateButton)

const Content = Widget.CenterBox({
  css: 'min-width: 2px; min-height: 2.5rem;',
  startWidget, centerWidget: Indicator, endWidget
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
