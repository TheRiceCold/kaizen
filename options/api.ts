import { opt } from 'lib/option'

export default {
  api: {
    weather: {
      key: opt(''),
      city: opt('Caloocan')
    },
    openai: {
      key: opt(''),
    },
    gemini: {
      key: opt(''),
    }
  }
}
