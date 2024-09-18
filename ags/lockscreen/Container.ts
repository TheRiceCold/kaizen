import PasswordEntry from './PasswordEntry'

import { capitalize } from 'lib/utils'
import options from 'options'

const bgImage = `${Utils.HOME}/.config/background`
const time = Variable('', { poll: [10000, ['time', '+%I:%M']] })
const date = Variable('', { poll: [900000, ['date', '+%A, %b %d']] })

const Clock = Widget.Box(
  { vertical: true, className: 'clock-content' },
  Widget.Label().bind('label', date),
  Widget.Label().bind('label', time)
)

const Avatar = Widget.Box({
  hpack: 'center',
  className: 'avatar',
  css: `background-image: url('${options.avatar}');`,
})

const Welcome = Widget.Label({
  className: 'welcome-text',
  label: `Hello, ${capitalize(Utils.USER)}`,
})

const Content = Widget.Box({
  hexpand: true,
  vertical: true,
  hpack: 'center',
  vpack: 'center',
  children: [ Clock, Avatar, Welcome, PasswordEntry ]
})

export default Widget.Box([
  Widget.Revealer({
    revealChild: false,
    transition: 'crossfade',
    transitionDuration: 500,
  }, Widget.Box({
    hexpand: true,
    child: Content,
    className: 'lockscreen',
    css: `background-image: url('${bgImage}');`
  })).on('realize', self => Utils.idle(() => self.revealChild = true))
])
