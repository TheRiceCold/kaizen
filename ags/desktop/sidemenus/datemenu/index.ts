import { type ButtonProps } from 'types/widgets/button'

// import timer from './timer'
import Calendar from './calendar'
import weather from './weather'
import MenuRevealer from '../MenuRevealer'

import options from 'options'

export const activeStack = Variable('calendar')
const stackItems = [
  { name: 'calendar', content: Calendar() },
  { name: 'weather', content: weather },
  { name: 'agenda', content: Widget.Box() },
  { name: 'timer', content: /* timer */ Widget.Box() },
  { name: 'events', content: Widget.Box() },
]

const Stack = Widget.Stack({
  transition: 'slide_left_right',
  children: stackItems.reduce((acc, item) => {
    acc[item.name] = item.content
    return acc
  }, {})
})

const Buttons = Widget.Box({
  hpack: 'center',
  className: 'buttons',
  spacing: options.theme.spacing * 1.5,
  children: stackItems.map(item => Widget.Button({
    label: item.name,
    cursor: 'pointer',
    onClicked() {
      Stack.shown = item.name
      activeStack.value = item.name
    }
  }).hook(activeStack, (self: ButtonProps) => self.toggleClassName('active', activeStack.value === self.label)))
})

export default MenuRevealer('datemenu', [ Stack, Buttons ])
