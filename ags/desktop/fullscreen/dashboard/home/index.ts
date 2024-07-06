import Apps from './apps'
import Player from './player'
import Weather from './weather'
import Session from './session'

import Clock from './clock'
import Quote from './quote'
import GitHub from './github'
// import System from './System'
import TimeProgress from './time-progress'

// import Photo from '../Photo'

const Section = (...children) => Widget.Box({
  children,
  spacing: 16,
  className: 'section',
})

export default Widget.Scrollable(
  { hexpand: true, vexpand: true },
  Widget.Box(
    { vertical: true, className: 'home' },
    Section(Apps, Player, Weather, Session),
    Section(Clock, TimeProgress, Quote, GitHub, /* System */)
  )
)
