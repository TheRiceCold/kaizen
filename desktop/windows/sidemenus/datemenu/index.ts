import { type ButtonProps } from 'types/widgets/button'

import timer from './timer'
import weather from './weather'
import MenuRevealer from '../MenuRevealer'
import { setupCursorHover } from 'misc/cursorhover'

import options from 'options'

export const activeStack = Variable('calendar')
const stackItems = [
  { 
    // TODO: replace with better design
    name: 'calendar' , 
    content: Widget.Box({
      className: 'calendar',
      children: [ Widget.Calendar({ hexpand: true }) ],
    }),
  },
  { name: 'weather', content: weather },
  { name: 'agenda', content: Widget.Box([ ]) },
  { name: 'timer', content: timer },
  { name: 'events', content: Widget.Box([ ]) },
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
    setup: setupCursorHover,
    onClicked() {
      Stack.shown = item.name
      activeStack.value = item.name
    }
  }).hook(activeStack, (self: ButtonProps) => self.toggleClassName('active', activeStack.value === self.label)))
})

export default MenuRevealer('datemenu', [ Stack, Buttons ])
