import GPTService from 'service/api/gpt'
import { markdownTest } from 'misc/md2pango'
import { ChatMessage, SystemMessage } from '../Message'

const chatContent = Widget.Box({ vertical: true }).hook(
  GPTService,
  (box, id) => {
    const message = GPTService.messages[id]
    if (!message) return
    box.add(
      ChatMessage(
        message,
        `Model (${GPTService.providers[GPTService.providerID]['name']})`,
      ),
    )
  },
  'newMsg',
)

function clearChat() {
  GPTService.clear()
  const children = chatContent.get_children()
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    child.destroy()
  }
}

export default (text) => {
  // Check if text or API key is empty
  if (text.length == 0) return
  if (GPTService.key.length == 0) {
    GPTService.key = text
    chatContent.add(
      SystemMessage(`Key saved to\n\`${GPTService.keyPath}\``, 'API Key'),
    )
    text = ''
    return
  }
  // Commands
  if (text.startsWith('/')) {
    if (text.startsWith('/clear')) clearChat()
    else if (text.startsWith('/model'))
      chatContent.add(
        SystemMessage(`Currently using \`${GPTService.modelName}\``, '/model'),
      )
    else if (text.startsWith('/prompt')) {
      const firstSpaceIndex = text.indexOf(' ')
      const prompt = text.slice(firstSpaceIndex + 1)
      if (firstSpaceIndex == -1 || prompt.length < 1)
        chatContent.add(SystemMessage('Usage: `/prompt MESSAGE`', '/prompt'))
      else GPTService.addMessage('user', prompt)
    } else if (text.startsWith('/key')) {
      const parts = text.split(' ')
      if (parts.length == 1)
        chatContent.add(
          SystemMessage(
            `Key stored in:\n\`${GPTService.keyPath}\`\nTo update this key, type \`/key YOUR_API_KEY\``,
            '/key',
          ),
        )
      else {
        GPTService.key = parts[1]
        chatContent.add(
          SystemMessage(
            `Updated API Key at\n\`${GPTService.keyPath}\``,
            '/key',
          ),
        )
      }
    } else if (text.startsWith('/test'))
      chatContent.add(SystemMessage(markdownTest, 'Markdown test'))
    else chatContent.add(SystemMessage('Invalid command.', 'Error'))
  } else GPTService.send(text)
}
