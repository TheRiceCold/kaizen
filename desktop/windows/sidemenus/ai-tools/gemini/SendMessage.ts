import GeminiService from 'service/api/gemini'
import { markdownTest } from 'misc/md2pango'
import { ChatMessage, SystemMessage } from '../Message'

const MODEL_NAME = 'Gemini'

const ChatContent = Widget.Box({ vertical: true }).hook(
  GeminiService,
  (box, id) => {
    const message = GeminiService.messages[id]
    if (!message) return
    box.add(ChatMessage(message, MODEL_NAME))
  },
  'newMsg',
)

function clearChat() {
  GeminiService.clear()
  const children = ChatContent.get_children()
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    child.destroy()
  }
}

export default (text) => {
  if (text.length == 0) return
  if (GeminiService.key.length == 0) {
    GeminiService.key = text
    ChatContent.add(
      SystemMessage(`Key saved to\n\`${GeminiService.keyPath}\``, 'API Key'),
    )
    text = ''
    return
  }

  if (text.startsWith('/')) {
    if (text.startsWith('/clear')) clearChat()
    else if (text.startsWith('/load')) {
      clearChat()
      GeminiService.loadHistory()
    } else if (text.startsWith('/model'))
      ChatContent.add(
        SystemMessage(
          `Currently using \`${GeminiService.modelName}\``,
          '/model',
        ),
      )
    else if (text.startsWith('/prompt')) {
      const firstSpaceIndex = text.indexOf(' ')
      const prompt = text.slice(firstSpaceIndex + 1)
      if (firstSpaceIndex == -1 || prompt.length < 1)
        ChatContent.add(SystemMessage('Usage: `/prompt MESSAGE`', '/prompt'))
      else GeminiService.addMessage('user', prompt)
    } else if (text.startsWith('/key')) {
      const parts = text.split(' ')
      if (parts.length == 1)
        ChatContent.add(
          SystemMessage(
            `Key stored in:\n\`${GeminiService.keyPath}\`\nTo update this key, type \`/key YOUR_API_KEY\``,
            '/key',
          ),
        )
      else {
        GeminiService.key = parts[1]
        ChatContent.add(
          SystemMessage(
            `Updated API Key at\n\`${GeminiService.keyPath}\``,
            '/key',
          ),
        )
      }
    } else if (text.startsWith('/test'))
      ChatContent.add(SystemMessage(markdownTest, 'Markdown test'))
    else ChatContent.add(SystemMessage('Invalid command.', 'Error'))
  } else GeminiService.send(text)
}
