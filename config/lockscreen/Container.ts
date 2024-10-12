import { type BoxProps } from 'types/widgets/box'

import { VBox } from 'widgets'
import PasswordEntry from './PasswordEntry'

import { capitalize } from 'lib/utils'
import options from 'options'
import { greetTimeType, greetTime } from 'lib/variables'

const bgImage = `${Utils.HOME}/.config/background`

const { Box, Label, Revealer } = Widget
const time = Variable('', { poll: [10000, ['date', '+%I:%M']] })
const date = Variable('', { poll: [900000, ['date', '+%A, %b %d']] })

// TODO: Topbar
const Content = VBox(
  {
    hexpand: true,
    vertical: true,
    hpack: 'center',
    vpack: 'center',
  },
  Box(
    { vertical: true, className: 'clock-content' },
    Label().bind('label', date),
    Label().bind('label', time),
  ),
  Box({
    hpack: 'center',
    className: 'avatar',
    css: `background-image: url('${options.avatar}');`,
  }),
  Label({
    className: 'welcome-text',
    label: greetTime
      .bind()
      .as((greet: greetTimeType) => `Good ${greet}, ${capitalize(Utils.USER)}`),
  }),
  PasswordEntry,
)

export default Box([
  Revealer(
    {
      revealChild: false,
      transition: 'crossfade',
      transitionDuration: 500,
    },
    Box(
      {
        hexpand: true,
        className: 'lockscreen',
        css: `background-image: url('${bgImage}');`,
      },
      Content,
    ),
  ).on('realize', (self: BoxProps) =>
    Utils.idle(() => (self.revealChild = true)),
  ),
])
