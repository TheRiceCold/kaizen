import { type ButtonProps } from 'types/widgets/button'

import Annotation from 'service/annotation'

import { ButtonLabel, VBox } from 'widgets'
import PopupRevealer from '../PopupRevealer'
import { hyprland } from 'lib/utils'

const { Box, Label, Revealer } = Widget
const { action } = Annotation

const ActionButtons = Box({
  className: 'control-buttons',
  children: [
    { label: 'Undo', onClicked() { action('undo') } },
    { label: 'Redo', onClicked() { action('redo') } },
    {
      label: 'Pin',
      onClicked(self: ButtonProps) {
        hyprland.dispatch('pin')
        self.label = self.label === 'Pin' ? 'Unpin' : 'Pin'
      }
    },
    { label: 'Clear', onClicked() { action('clear') } },
    { label: 'Quit', onClicked() { action('quit') } },
  ].map(props => ButtonLabel(props.label, props.onClicked)),
})

const ToolsInfo = Revealer({
  child: VBox(
    { className: 'info' },
    Label('Line: Hold Shift'),
    Label('Arrow: Hold Ctrl'),
    Label('Secondary Color: Hold Alt'),
    Label('Rectangle: Middle Click'),
    Label('Eraser: Right Click'),
  )
})

export default PopupRevealer({
  vertical: true,
  hpack: 'center',
  className: 'annotation-tool',
  reveal: hyprland.bindActiveClient('class', (c: string) => c === 'Gromit-mpx')
}, ActionButtons, VBox([
  ToolsInfo, ButtonLabel('View brushes ', (self: ButtonProps) => {
    ToolsInfo.revealChild = !ToolsInfo.revealChild
    self.label = ToolsInfo.revealChild ? 'Hide Tools ' : 'View Tools '
  }, { hexpand: true })
]))
