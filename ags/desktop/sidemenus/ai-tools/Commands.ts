import { currentTab } from './Content'
import GeminiSendMessage from './gemini/SendMessage'
import GPTSendMessage from './gpt/SendMessage'

const CommandButton = (command: string) => Widget.Button({
  label: command,
  cursor: 'pointer',
  attribute: { command },
}).hook(currentTab, self => {
  const cmd = self.attribute.command
  self.onClicked = () => currentTab.value === 'gemini' ? GeminiSendMessage(cmd) : GPTSendMessage(cmd)
})

export default Widget.Box(
  { hpack: 'end' },
  CommandButton('/key'),
  CommandButton('/model'),
  CommandButton('/clear'),
)
