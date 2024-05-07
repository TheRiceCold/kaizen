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

const ToolsInfo = Widget.Revealer({
  child: Widget.Box(
    { vertical: true, className: 'info' },
    Widget.Label('Line: Hold Shift'),
    Widget.Label('Arrow: Hold Ctrl'),
    Widget.Label('Secondary Color: Hold Alt'),
    Widget.Label('Rectangle: Middle Click'),
    Widget.Label('Eraser: Right Click'),
  )
})

export default PopupRevealer({ 
  vertical: true,
  hpack: 'center',
  className: 'annotation-tool',
  reveal: hyprland.active.client.bind('class').as((c: string) => c === 'Gromit-mpx'),
  children: [
    Widget.Box({
      className: 'control-buttons',
      children: buttons.map(props => Widget.Button({ setup: setupCursorHover, ...props })),
    }),
    Widget.Box(
      { vertical: true },
      ToolsInfo,
      Widget.Button({
        hexpand: true,
        setup: setupCursorHover,
        label: 'View brushes ',
        onClicked(self) {
          ToolsInfo.revealChild = !ToolsInfo.revealChild
          self.label = ToolsInfo.revealChild ? 'Hide Tools ' : 'View Tools '
        }
      })
    )
  ]
})
