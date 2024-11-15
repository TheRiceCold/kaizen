import { VBox } from 'widgets'

import Time from './time'
import GitHub from './github'
import Player from './player'
import Weather from './weather'
import Knowledge from './knowledge'

import options from 'options'
import { capitalize } from 'lib/utils'
import { greetTime } from 'lib/variables'

const { bio } = options.dashboard
const { Box, Label, Scrollable } = Widget

const Content = Scrollable({ vexpand: true },
  VBox({ hpack: 'center', className: 'sections' },
    Box([Player, Weather]),
    Box([Time, Knowledge]),
    Box([GitHub]),
    // TODO: Calculator
  ))

export default VBox({
  hexpand: true,
  className: 'home',
  children: [
    Label({
      xalign: 0, className: 'greeter',
      label: greetTime.bind().as((g: string) => `Good ${g}, ${capitalize(USER)}`)
    }),
    Label({ xalign: 0, className: 'bio' }).bind('label', bio),
    Content
  ]
})
