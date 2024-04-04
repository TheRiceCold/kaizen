import general from './General'
import colorschemes from './Colorschemes'

import icons from 'data/icons'
import { setupCursorHover } from 'misc/cursorhover'

const Stack = Widget.Stack({ 
  className: 'theme-settings',
  transition: 'slide_left_right',
  children: { general, colorschemes }
})

// IDK why this doesn't work using arrow function.
export function Title (label: string, dir: 'left' | 'right', gotoStack: string) {
  return  Widget.Box({
    className: 'title',
    children: [
      Widget.Label({ xalign: 0, label }),
      Widget.Button({ 
        hpack: 'end', 
        hexpand: true, 
        setup: setupCursorHover,
        child: Widget.Icon(icons.ui.arrow[dir]),
        onClicked: () => Stack.shown = gotoStack,
      }),
    ]
  })
}

export function Item(label: string, children) {
  return Widget.Box({
    className: 'item',
    children: [ 
      Widget.Label(label),
      Widget.Box({
        children,
        hpack: 'end',
        hexpand: true,
      })
    ]
  })
} 

export default Stack
