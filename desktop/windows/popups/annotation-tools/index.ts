import Annotation from 'service/annotation'

import PopupRevealer from '../PopupRevealer'

import { setupCursorHover } from 'misc/cursorhover'

const { undo, redo, pin, clear, quit } = Annotation
const hyprland = await Service.import('hyprland')

const buttons = [
  { label: 'Undo', onClicked: undo },
  { label: 'Redo', onClicked: redo },
  { 
    label: 'Pin', 
    onClicked(self) {
      pin(); self.label = self.label === 'Pin' ? 'Unpin' : 'Pin'
    }
  },
  { label: 'Clear', onClicked: clear },
  { label: 'Quit', onClicked: quit },
]

export default PopupRevealer({ 
  // reveal: Annotation.bind('active'), // TODO: abstraction
  hpack: 'center',
  className: 'annotation-tool',
  reveal: hyprland.active.client.bind('class').as((c: string) => c === 'Gromit-mpx'),
  children: buttons.map(props => Widget.Button({ setup: setupCursorHover, ...props })),
})
