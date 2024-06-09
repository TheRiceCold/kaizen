import GPTService from 'service/api/gpt'

import { ChatContent } from './View'
import { SystemMessage } from '../Message'

import { markdownTest } from 'misc/md2pango'

function clear() {
  GPTService.clear()
  const children = ChatContent.get_children()
  children.forEach(child => child.destroy())
}

function prompt(text) {
  const firstSpaceIndex = text.indexOf(' ')
  const prompt = text.slice(firstSpaceIndex + 1)
  if (firstSpaceIndex == -1 || prompt.length < 1)
    ChatContent.add(SystemMessage('Usage: `/prompt MESSAGE`', '/prompt'))
  else GPTService.addMessage('user', prompt)
}

function updateKey(text) {
  const parts = text.split(' ')
  if (parts.length == 1)
    ChatContent.add(SystemMessage(`Key stored in:\n\`${GPTService.keyPath}\`\nTo update this key, type \`/key YOUR_API_KEY\``, '/key'))
  else {
    GPTService.key = parts[1]
    ChatContent.add(SystemMessage(`Updated API Key at\n\`${GPTService.keyPath}\``, '/key'))
  }
}

export default (text) => {
  if (text.length == 0) return
  if (GPTService.key.length == 0) {
    GPTService.key = text
    ChatContent.add(SystemMessage(`Key saved to\n\`${GPTService.keyPath}\``, 'API Key'))
    text = ''
    return
  }

  if (text.startsWith('/')) {
    if (text.startsWith('/clear'))
      clear()
    else if (text.startsWith('/model'))
      ChatContent.add(SystemMessage(`Currently using \`${GPTService.modelName}\``, '/model'))
    else if (text.startsWith('/prompt'))
      prompt(text)
    else if (text.startsWith('/key'))
      updateKey(text)
    else if (text.startsWith('/test'))
      ChatContent.add(SystemMessage(markdownTest, 'Markdown test'))
    else
      ChatContent.add(SystemMessage('Invalid command.', 'Error'))
  }
  else GPTService.send(text)
}
