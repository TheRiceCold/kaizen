import { opt, mkOptions } from 'lib/option'
import windows from './windows'
import theme from './theme'
import fonts from './fonts'

type TShader = 
  | 'default' 
  | 'blue light'
  | 'grayscale' 
  | 'invert'

export default mkOptions(OPTIONS, {
  autotheme: opt(true),
  transition: opt(200),

  hyprland: {
    gaps: opt(1.5),
    gapsWhenOnly: opt(true),
    inactiveBorder: opt('333333ff'),
    shader: opt<TShader>('default')
  },

  ai: {
    defaultGPTProvider: opt('openai'),
    defaultTemperature: opt(0.9),
    enhancements: opt(true),
    useHistory: opt(true),
    writingCursor: opt(' ...'), // Warning: Using weird characters can mess up Markdown rendering
    proxyUrl: opt(null), // Can be "socks5://127.0.0.1:9050" or "http://127.0.0.1:8080" for example. Leave it blank if you don't need it.
  },

  ...fonts,
  ...theme,
  ...windows,
})
