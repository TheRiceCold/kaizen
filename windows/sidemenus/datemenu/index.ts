import { type Props as RevealerProps } from 'types/widgets/label'
import { type BoxProps } from 'types/widgets/box'
import weather from './weather'
import timer from './timer'

import options from 'options'
import { sidemenuShow } from 'lib/variables'

const Stack = Widget.Stack({
  transition: 'slide_left_right',
  children: {
    calendar: Widget.Box({
      className: 'calendar',
      children: [ Widget.Calendar({ hexpand: true }) ],
    }),
    weather,
    agenda: Widget.Box({ }),
    timer,
    events: Widget.Box({ }),
  },
})

const buttons = [ 'calendar', 'agenda', 'weather', 'timer', 'events' ]

const DateMenu = Widget.Box({
  className: 'datemenu',
  vertical: true,
  children: [
    Stack,
    Widget.Box({
      hpack: 'center',
      className: 'buttons',
      spacing: options.theme.spacing * 1.5,
      children: buttons.map(item => Widget.Button({
        label: item, 
        onClicked(self: BoxProps) {
          Stack.shown = item
          self.toggleClassName('active', true)
        },
      }))
    })
  ]
})

export default Widget.Revealer({
  child: DateMenu,
  transition: 'slide_down',
  transitionDuration: options.transition.value,
}).hook(sidemenuShow.datemenu, (self: RevealerProps) => self.revealChild = sidemenuShow.datemenu.value)
