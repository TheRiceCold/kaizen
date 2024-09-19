import { ButtonLabel, VBox } from 'widgets'

import KeyButton from './KeyButton'

import { sh, bash } from 'lib/utils'
import { toggleWidget } from 'lib/globals'
import keyboardLayout from 'data/keyboard'

const { Box, Separator } = Widget
const kbLayout = keyboardLayout['qwerty_full']

export default Box(
  { className: 'body' },
  VBox([
    ButtonLabel('󰌏', () => {
      toggleWidget('keyboard')
      sh([
        'ydotool', 'key',
        ...Array.from(Array(249).keys()).map(code => `${code}:0`)
      ]).then(() => print('[OSK] Released all keys')).catch(print)
    }, { className: 'control-button' }),

    ButtonLabel(kbLayout['name_short'], () => { }, { className: 'control-button' }),

    ButtonLabel('󰅍', () => {
      bash`pkill fuzzel || cliphist list | fuzzel --no-fuzzy --dmenu | cliphist decode | wl-copy`
    }, { className: 'control-button' })
  ]),
  Separator({ vertical: true }),
  VBox(kbLayout.keys.map(row => Box({ children: row.map(KeyButton) })))
)
