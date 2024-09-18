import { type ButtonProps } from 'types/widgets/button'

import { ButtonLabel } from 'widgets'
import GeminiSendMessage from './gemini/SendMessage'

const CommandButton = (command: string) => ButtonLabel(
  command,
  (self: ButtonProps) => {
    const cmd = self.attribute.command
    GeminiSendMessage(cmd)
  }, { attribute: { command } })

export default Widget.Box(
  { hpack: 'end' },
  CommandButton('/key'),
  CommandButton('/model'),
  CommandButton('/clear'),
)
