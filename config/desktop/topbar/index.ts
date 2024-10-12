import {
  LogoButton,
  Workspaces,
  AiButton,
  RunButton,
  ToolsButton,
  SettingsButton,
  Indicator,
  Tray, TraySeparator,
  QuickSettingsButton,
  DateButton,
  SessionButton,
} from './buttons'

const { Box, CenterBox, Separator } = Widget

export default Widget.Window({
  name: 'topbar',
  keymode: 'none',
  className: 'topbar',
  exclusivity: 'exclusive',
  anchor: ['top', 'right', 'left'],
}, CenterBox( // Content
  { css: 'min-width: 2px; min-height: 2.5rem;' },
  Box( // Start
    { hpack: 'start', className: 'side-items' },
    LogoButton,
    Separator({ vertical: true }),
    Workspaces,
    Separator({ vertical: true }),
    AiButton,
    RunButton,
    ToolsButton,
    SettingsButton,
  ),

  // Center
  Box({ vpack: 'start', homogeneous: true }, Indicator),

  Box( // End
    { hpack: 'end', className: 'side-items' },
    Tray, TraySeparator,
    QuickSettingsButton,
    Separator({ vertical: true }),
    DateButton,
    Separator({ vertical: true }),
    SessionButton
  )
))
