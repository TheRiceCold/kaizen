import Setter from './Setter'
import themes from './themes'
import general from './general'

import icons from 'data/icons'
import { setupCursorHover } from 'misc/cursorhover'

const Stack = Widget.Stack({ 
  className: 'theme-settings',
  transition: 'slide_left_right',
  children: { general, themes }
})

// IDK why this doesn't work using arrow function.
export function Title (label: string, dir: 'left' | 'right', gotoStack: string) {
  return  Widget.Box(
    { className: 'title' },
    Widget.Label({ xalign: 0, label }),
    Widget.Button({ 
      hpack: 'end', 
      hexpand: true, 
      setup: setupCursorHover,
      child: Widget.Icon(icons.ui.arrow[dir]),
      onClicked: () => Stack.shown = gotoStack,
    }),
  )
}

export function Item(label: string, props) {
  return Widget.Box(
    { className: 'item' },
    Widget.Label(label),
    Widget.Box({
      hpack: 'end',
      hexpand: true,
      child: Setter(props),
    }),
    Widget.Button({
      vpack: 'center',
      className: 'reset',
      setup: setupCursorHover,
      onClicked: () => props.opt.reset(),
      child: Widget.Icon(icons.ui.refresh),
      sensitive: props.opt.bind().as(v => v !== props.opt.initial),
    }),
  )
} 

export default Stack
