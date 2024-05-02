import { currentTab, stackItems } from './Content'
import GeminiSendMessage from './gemini/SendMessage'
import GPTSendMessage from './gpt/SendMessage'

import { setupCursorHover } from 'misc/cursorhover'

const CommandButton = (command: string) => Widget.Button({
  label: command,
  attribute: { command },
  setup: setupCursorHover,
}).hook(currentTab, self => {
  const cmd = self.attribute.command
  self.onClicked = () => (stackItems[currentTab.value] === 0) 
    ? GeminiSendMessage(cmd) : GPTSendMessage(cmd)
})

export default Widget.Box(
  { hpack: 'end' },
  CommandButton('/key'),
  CommandButton('/model'),
  CommandButton('/clear'),
)
