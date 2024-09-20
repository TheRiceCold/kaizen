import { VBox } from 'widgets'

import PasswordEntry from './PasswordEntry'

import options from 'options'

import { capitalize } from 'lib/utils'
import { greetTime } from 'lib/variables'

const { Box, Label, Revealer } = Widget

const bgImage = `${Utils.HOME}/.config/background`

const time = Variable('', { poll: [10000, ['time', '+%I:%M']] })
const date = Variable('', { poll: [900000, ['time', '+%A, %b %d']] })

export default Box([
  Revealer({
    revealChild: false,
    transition: 'crossfade',
    transitionDuration: 500,
  }, Box({
    hexpand: true,
    child: Content,
    className: 'lockscreen',
    css: `background-image: url('${bgImage}');`
  }, VBox({
    hexpand: true,
    hpack: 'center',
    vpack: 'center',
    chlidren: [
      // Time
      VBox(
        { className: 'clock-content' },
        Label().bind('label', date),
        Label().bind('label', time)
      ),

      // Avatar
      Box({
        hpack: 'center',
        className: 'avatar',
        css: `background-image: url('${options.avatar}');`,
      }),

      // Welcome
      Label({
        className: 'welcome-text',
        label: greetTime.bind().as((g: string) => `Good ${g}, ${capitalize(Utils.USER)}`)
      }),

      PasswordEntry
    ]
  }))).on('realize', (self: typeof Box) => Utils.idle(() => self.revealChild = true))
])
