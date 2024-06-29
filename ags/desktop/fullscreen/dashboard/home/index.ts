import Clock from './Clock'
import Weather from './weather'

export default Widget.Box(
  { vertical: true, className: 'home' },
  Widget.Box({ spacing: 24, className: 'section' }, Clock, Weather)
)
