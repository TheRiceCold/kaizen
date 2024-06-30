import Clock from './Clock'
import Weather from './weather'
import Player from './Player'

export default Widget.Box(
  { spacing: 16, vertical: true, className: 'home' },
  Widget.Box({ className: 'section' }, Player, Weather, Clock)
)
