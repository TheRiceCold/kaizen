import { opt } from 'lib/option'

export default {
  defaultGPTProvider: opt('openai'),
  defaultTemperature: opt(0.9),
  enhancements: opt(true),
  useHistory: opt(true),
  writingCursor: opt(' ...'), // Warning: Using weird characters can mess up Markdown rendering
  proxyUrl: opt<null | string>(null), // Can be "socks5://127.0.0.1:9050" or "http://127.0.0.1:8080" for example. Leave it blank if you don't need it.
}
