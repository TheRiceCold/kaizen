import Setter from './Setter'
import themes from './themes'
import general from './general'
import advanced from './advanced'

import icons from 'data/icons'
import { setupCursorHover } from 'misc/cursorhover'

type StackNameType = 'general' | 'themes' | 'advanced'

const Stack = Widget.Stack({ 
  className: 'theme-settings',
  transition: 'slide_left_right',
  children: { general, themes, advanced }
})

// IDK why this doesn't work using arrow function.
export function Title (
  { label, leftTo, rightTo }: 
  { label: string, leftTo?: StackNameType, rightTo?: StackNameType }
) {
  const Button = (dir: string, gotoStack: StackNameType) => Widget.Button({ 
    hpack: 'end', 
    hexpand: true, 
    setup: setupCursorHover,
    child: Widget.Icon(icons.ui.arrow[dir]),
    onClicked() { Stack.shown = gotoStack },
  })

  return  Widget.Box(
    { className: 'title' },
    Widget.Label({ xalign: 0, label: `${label} Settings` }),
    Widget.Box({ hexpand: true, hpack: 'end' },
      leftTo && Button('left', leftTo),
      rightTo && Button('right', rightTo),
    )
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
