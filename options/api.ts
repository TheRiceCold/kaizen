import { opt } from 'lib/option'
import keys from 'keys'

export default {
  api: {
    weather: { url: `wttr.in/caloocan?format=j1` },
    openai: {
      key: opt(keys.OPENAI_API_KEY),
    },
    gemini: {
      key: opt(''),
    }
  }
}
