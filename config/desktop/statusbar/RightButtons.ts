import { type ButtonProps } from 'types/widgets/button'

import {
  Tray, TraySeparator,
  QuickSettingsButton,
  DateButton,
  SessionButton,
  RightButtonsRevealer,
} from './buttons'
import { RoundedCorner } from 'widgets'

import options from 'options'

const { Box, Separator } = Widget

const showWhenStyleIs = (style: 'full' | 'separated', button: ButtonProps) =>
  button.bind('visible', options.statusbar.style, 'value', (s) => s === style)

export default Box(
  { hpack: 'end', className: 'side-items' },
  showWhenStyleIs('separated', RightButtonsRevealer),
  showWhenStyleIs('separated', Separator({ vertical: true })),

  Tray, TraySeparator,
  QuickSettingsButton,
  Separator({ vertical: true }),
  DateButton,
  Separator({ vertical: true }),
  SessionButton,
  showWhenStyleIs('full', RoundedCorner('topright', { className: 'corner-black' })),
)
