import GeminiService from 'service/api/gemini'

import { ChatContent } from './View'
import { SystemMessage } from '../Message'

import { markdownTest } from 'misc/md2pango'

function clear() {
  GeminiService.clear()
  const children = ChatContent.get_children()
  children.forEach(child => child.destroy())
}

function prompt(text: string) {
  const firstSpaceIndex = text.indexOf(' ')
  const prompt = text.slice(firstSpaceIndex + 1)
  if (firstSpaceIndex === -1 || prompt.length < 1)
    ChatContent.add(SystemMessage('Usage: `/prompt MESSAGE`', '/prompt'))
  else
    GeminiService.addMessage('user', prompt)
}

function updateKey(text: string) {
  const parts = text.split(' ')
  if (parts.length === 1)
    ChatContent.add(SystemMessage(`Key stored in:\n\`${GeminiService.keyPath}\`\nTo update this key, type \`/key YOUR_API_KEY\``, '/key'))
  else {
    GeminiService.key = parts[1]
    ChatContent.add(SystemMessage(`Updated API Key at\n\`${GeminiService.keyPath}\``, '/key'))
  }
}

export default (text: string) => {
  if (text.trim() === '') return

  if (GeminiService.key.length === 0) {
    GeminiService.key = text
    ChatContent.add(SystemMessage(`Key saved to\n\`${GeminiService.keyPath}\``, 'API Key'))
    text = ''
    return
  }

  if (text.startsWith('/')) {
    if (text.startsWith('/clear'))
      clear()
    else if (text.startsWith('/load')) {
      clear()
      GeminiService.loadHistory()
    }
    else if (text.startsWith('/model'))
      ChatContent.add(SystemMessage(`Currently using \`${GeminiService.modelName}\``, '/model'))
    else if (text.startsWith('/prompt'))
      prompt(text)
    else if (text.startsWith('/key'))
      updateKey(text)
    else if (text.startsWith('/test'))
      ChatContent.add(SystemMessage(markdownTest, 'Markdown test'))
    else
      ChatContent.add(SystemMessage('Invalid command.', 'Error'))
  }
  else GeminiService.send(text)
}
