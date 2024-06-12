import GeminiSendMessage from './gemini/SendMessage'

const CommandButton = (command: string) => Widget.Button({
  label: command,
  cursor: 'pointer',
  attribute: { command },
  onClicked(self) {
    const cmd = self.attribute.command
    GeminiSendMessage(cmd)
  }
})

export default Widget.Box(
  { hpack: 'end' },
  CommandButton('/key'),
  CommandButton('/model'),
  CommandButton('/clear'),
)
