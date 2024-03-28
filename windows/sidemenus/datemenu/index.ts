import weather from './weather'
import options from 'options'

const Stack = Widget.Stack({
  transition: 'slide_left_right',
  children: {
    calendar: Widget.Box({
      className: 'calendar',
      children: [ Widget.Calendar({ hexpand: true }) ],
    }),
    weather,
    agenda: Widget.Box({

    }),
    timer: Widget.Box({

    }),
    events: Widget.Box({

    }),
  },
})

const buttons = [ 'calendar', 'agenda', 'weather', 'timer', 'events' ]

export default Widget.Box({
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
        onClicked(self) {
          Stack.shown = item
          self.toggleClassName('active', true)
        },
      }))
    })
  ]
})
