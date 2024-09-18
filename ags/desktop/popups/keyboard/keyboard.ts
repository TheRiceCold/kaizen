import KeyButton from './KeyButton'
import keyboardLayout from 'data/keyboard'

import { sh, bash } from 'lib/utils'
import { toggleWidget } from 'lib/globals'
import { ButtonLabel } from 'widgets'

const kbLayout = keyboardLayout['qwerty_full']

export default Widget.Box(
  { className: 'body' },
  Widget.Box(
    { vertical: true },
    ButtonLabel('󰌏', () => {
      sh([
        'ydotool', 'key',
        ...Array.from(Array(249).keys()).map(code => `${code}:0`)
      ]).then(console.log('[OSK] Released all keys')).catch(print)
      toggleWidget('keyboard')
    }, { className: 'control-button' }),
    ButtonLabel(kbLayout['name_short'], () => { }),
    ButtonLabel('󰅍', () => {
      bash`pkill fuzzel || cliphist list | fuzzel --no-fuzzy --dmenu | cliphist decode | wl-copy`
    })
  ),
  Widget.Separator({ vertical: true }),
  Widget.Box({
    vertical: true,
    children: kbLayout.keys.map(row => Widget.Box({ children: row.map(KeyButton) }))
  })
)
