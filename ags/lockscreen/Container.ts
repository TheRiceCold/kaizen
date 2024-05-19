import Clock from './Clock'
import Avatar from './Avatar'
import PasswordEntry from './PasswordEntry'

import { capitalize } from 'lib/utils'

const bgImage = `${Utils.HOME}/.config/background`

const Content = Widget.Box({
  vertical: true,
  vpack: 'center',
  hpack: 'center',
  children: [
    Clock,
    Avatar,
    Widget.Label({
      label: `Hello, ${capitalize(Utils.USER)}`,
      css: 'font-size: 2em; margin: 1em 0; opacity: 0.9;',
    }),
    PasswordEntry,
  ]
})

export default Widget.Box(
  {  hpack: 'center', vpack: 'center' },
  Widget.Revealer({
    revealChild: false,
    transition: 'crossfade',
    transitionDuration: 500,
    child: Widget.Box(
      {
        vertical: true,
        css: `
          background-image: url('${bgImage}');
          background-position: center;
          background-size: cover;
          padding: 10em 30em;`
      },
      Content,
    )
  }).on('realize', self => Utils.idle(() => self.revealChild = true))
)
