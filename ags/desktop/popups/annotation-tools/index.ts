import { type ButtonProps } from 'types/widgets/button'

import Annotation from 'service/annotation'

import { ButtonLabel, VBox } from 'widgets'
import PopupRevealer from '../PopupRevealer'

const { undo, redo, pin, clear, quit } = Annotation
const hyprland = await Service.import('hyprland')

const ActionButtons = Widget.Box({
  className: 'control-buttons',
  children: [
    { label: 'Undo', onClicked: undo },
    { label: 'Redo', onClicked: redo },
    {
      label: 'Pin',
      onClicked(self: ButtonProps) {
        pin()
        self.label = self.label === 'Pin' ? 'Unpin' : 'Pin'
      }
    },
    { label: 'Clear', onClicked: clear },
    { label: 'Quit', onClicked: quit },
  ].map(props => ButtonLabel(props.label, props.onClicked)),
})

const ToolsInfo = Widget.Revealer({
  child: VBox(
    { className: 'info' },
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
}, ActionButtons, VBox([
  ToolsInfo, ButtonLabel('View brushes ', (self: ButtonProps) => {
    ToolsInfo.revealChild = !ToolsInfo.revealChild
    self.label = ToolsInfo.revealChild ? 'Hide Tools ' : 'View Tools '
  }, { hexpand: true })
]))
