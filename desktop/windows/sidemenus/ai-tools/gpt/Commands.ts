import { setupCursorHover } from 'misc/cursorhover'
import SendMessage from './SendMessage'

const CommandButton = (command) =>
  Widget.Button({
    className: 'sidebar-chat-chip sidebar-chat-chip-action',
    onClicked: () => SendMessage(command),
    setup: setupCursorHover,
    label: command,
  })

export default Widget.Box(
  Widget.Box({ hexpand: true }),
  CommandButton('/key'),
  CommandButton('/model'),
  CommandButton('/clear'),
)
