import Annotation from 'service/annotation'

import PopupRevealer from '../PopupRevealer'

import { setupCursorHover } from 'misc/cursorhover'

const { undo, redo, quit, clear } = Annotation
const hyprland = await Service.import('hyprland')

const buttons = [
  { label: 'Undo', onClicked: undo },
  { label: 'Redo', onClicked: redo },
  { label: 'Quit', onClicked: quit },
  { label: 'Clear', onClicked: clear },
]

export default PopupRevealer({ 
  // reveal: Annotation.bind('active'), // TODO: abstraction
  reveal: hyprland.active.client.bind('class').as((c: string) => c === 'Gromit-mpx'),
  children: buttons.map(props => Widget.Button({ setup: setupCursorHover, ...props })),
})
