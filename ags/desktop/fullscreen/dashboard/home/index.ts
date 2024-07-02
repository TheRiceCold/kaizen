import Player from './Player'
import Weather from './weather'

import GitHub from './GitHub'

const Section = (...children) => Widget.Box({ spacing: 16, className: 'section', children })

export default Widget.Box(
  { vertical: true, className: 'home' },
  Section(Player, Weather, /* Clock */),
  Section(GitHub),
)
