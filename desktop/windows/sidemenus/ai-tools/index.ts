import Content, { 
  currentTab,
  stackItems, 
} from './Content'
import Textbox  from './Textbox'
import MenuRevealer from '../MenuRevealer'
import GPTSendMessage from './gpt/SendMessage'
import GeminiSendMessage from './gemini/SendMessage'
import { setupCursorHover } from 'misc/cursorhover'

const CommandButton = (command: string) => Widget.Button({
  label: command,
  attribute: { command },
  setup: setupCursorHover,
  className: 'sidebar-chat-chip sidebar-chat-chip-action',
}).hook(currentTab, self => {
  const cmd = self.attribute.command
  self.onClicked = () => (stackItems[currentTab.value] === 0) 
    ? GeminiSendMessage(cmd) : GPTSendMessage(cmd)
})

const Commands = Widget.Box([
  Widget.Box({ hexpand: true }),
  CommandButton('/key'),
  CommandButton('/model'),
  CommandButton('/clear'),
])

export default MenuRevealer('ai-tools', [Content, Commands, Textbox])
