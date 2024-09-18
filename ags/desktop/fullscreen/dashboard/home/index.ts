import Apps from './apps'
import Time from './time'
import GitHub from './github'
import Player from './player'
import Weather from './weather'
import Knowledge from './knowledge'

import options from 'options'
import { capitalize } from 'lib/utils'

const { bio } = options.dashboard

const greetTime = Variable('morning', { // every 10 min
  poll: [600_000, () => {
    const date = new Date()
    const hour = date.getHours()
    return hour < 12 ? 'morning' :
      hour <= 18 && hour >= 12 ? 'afternoon' : 'evening'
  }]
})

const Section = (...children) => Widget.Box({ children, className: 'section' })
const Content = Widget.Scrollable({ vexpand: true },
  Widget.Box({ hpack: 'center', vertical: true },
    Section(Weather, Player, Apps),
    Section(Time, Knowledge),
    Section(GitHub),
  ))

export default Widget.Box({
  hexpand: true,
  vertical: true,
  className: 'home',
  children: [
    Widget.Label({
      xalign: 0, className: 'greeter',
      label: greetTime.bind().as((g: string) => `Good ${g}, ${capitalize(Utils.USER)}`)
    }),
    Widget.Label({ xalign: 0, className: 'bio', label: bio.bind() }),
    Content
  ]
})
