import Clock from './Clock'
import Player from './Player'
import Weather from './weather'

import GitHub from './GitHub'

export default Widget.Box(
  { vertical: true, className: 'home' },
  Widget.Box({ className: 'section' }, Player, Weather, Clock, GitHub),
)
