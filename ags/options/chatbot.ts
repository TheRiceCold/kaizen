import { opt } from 'lib/option'

export type geminiModelsType =
  | 'gemini-1.5-flash'
  | 'gemini-1.5-flash-8b'
  | 'gemini-1.5-pro'
  | 'gemini-1.0-pro'

export type chatGPTModelsType =
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'gpt-4-turbo'
  | 'gpt-4'
  | 'gpt-3.5-turbo'

export default {
  llama: {
    key: opt(''),
  },
  gemini: {
    key: opt(''),
    model: opt<geminiModelsType>('gemini-1.5-flash'),
  },
  temperature: opt(0.9),
  chatGPT: {
    key: opt(''),
    defaultGPTProvider: opt('openai'),
    model: opt<chatGPTModelsType>('gpt-3.5-turbo'),
  },
  enhancements: opt(true),
  useHistory: opt(true),
  writingCursor: opt(' ...'), // WARN: Using weird characters can mess up Markdown rendering
}
