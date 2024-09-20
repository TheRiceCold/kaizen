import { VBox } from 'widgets'

import Apps from './apps'
import Time from './time'
import GitHub from './github'
import Player from './player'
import Weather from './weather'
import Knowledge from './knowledge'

import options from 'options'
import { capitalize } from 'lib/utils'
import { greetTime } from 'lib/variables'

const { bio } = options.dashboard

const Section = (...children) => Widget.Box({ children, className: 'section' })
const Content = Widget.Scrollable({ vexpand: true },
  VBox({ hpack: 'center' },
    Section(Player, Weather, Apps),
    Section(Time, Knowledge),
    Section(GitHub),
  ))

export default VBox({
  hexpand: true,
  className: 'home',
  children: [
    Widget.Label({
      xalign: 0, className: 'greeter',
      label: greetTime.bind().as((g: string) => `Good ${g}, ${capitalize(Utils.USER)}`)
    }),
    Widget.Label({ xalign: 0, className: 'bio' }).bind('label', bio),
    Content
  ]
})
