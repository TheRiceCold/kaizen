import GeminiView from './gemini/View'

export type AskItemType = 'gemini' | 'chatgpt' | 'llama'

export const items = [
  {
    name: 'gemini',
    content: GeminiView,
    icon: 'google-gemini-symbolic',
    placeholderText: 'Message Gemini...',
  },
]
