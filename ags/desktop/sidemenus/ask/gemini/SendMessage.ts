import { type BoxProps } from 'types/widgets/box'
import GeminiService from 'service/api/gemini'

import { ChatContent } from './View'
import { SystemMessage } from '../Message'

import { markdownTest } from 'lib/utils'

function clear() {
  GeminiService.clear()
  const children = ChatContent.get_children()
  children.forEach((child: BoxProps) => child.destroy())
}

function prompt(text: string) {
  const firstSpaceIndex = text.indexOf(' ')
  const prompt = text.slice(firstSpaceIndex + 1)
  if (firstSpaceIndex === -1 || prompt.length < 1)
    ChatContent.add(SystemMessage('Usage: `/prompt MESSAGE`', '/prompt'))
  else
    GeminiService.addMessage('user', prompt)
}

export default (text: string) => {
  if (text.trim() === '') return

  if (text.startsWith('/')) {
    if (text.startsWith('/clear'))
      clear()
    else if (text.startsWith('/load')) {
      clear()
      GeminiService.loadHistory()
    }
    else if (text.startsWith('/prompt'))
      prompt(text)
    else if (text.startsWith('/test'))
      ChatContent.add(SystemMessage(markdownTest, 'Markdown test'))
    else
      ChatContent.add(SystemMessage('Invalid command.', 'Error'))
  }
  else GeminiService.send(text)
}
