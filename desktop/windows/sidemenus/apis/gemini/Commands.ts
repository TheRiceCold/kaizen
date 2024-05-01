import { setupCursorHover } from 'misc/cursorhover'
import SendMessage from './SendMessage'

const CommandButton = (command) =>
  Widget.Button({
    label: command,
    setup: setupCursorHover,
    onClicked: () => SendMessage(command),
    className: 'sidebar-chat-chip sidebar-chat-chip-action',
  })

export default Widget.Box([
  Widget.Box({ hexpand: true }),
  CommandButton('/key'),
  CommandButton('/model'),
  CommandButton('/clear'),
])
