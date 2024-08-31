import Apps from './apps'
import Player from './player'
import Weather from './weather'

import Clock from './clock'
import GitHub from './github'
import Quote from './quote'
// import System from './System'
import TimeProgress from './time-progress'

// import Photo from '../Photo'

import options from 'options'
import { capitalize } from 'lib/utils'

const { bio } = options.dashboard

const Section = (...children) => Widget.Box({
  children,
  spacing: 16,
  className: 'section',
})

const Greeter = Widget.Label({
  xalign: 0,
  className: 'greeter',
  label: `Good morning, ${capitalize(Utils.USER)}`
})

const Bio = Widget.Label({ xalign: 0, label: bio.bind(), className: 'bio' })

const Content = Widget.Scrollable(
  { hexpand: true, vexpand: true },
  Widget.Box(
    { vertical: true },
    Section(Apps, Player, Weather),
    Section(Clock, TimeProgress, Quote, GitHub, /* System */)
  )
)

export default Widget.Box({ className: 'home', vertical: true }, Greeter, Bio, Content)
