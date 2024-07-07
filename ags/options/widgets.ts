import { opt } from 'lib/option'

import quotes from 'data/quotes'

export default {
  quotes: opt(quotes),

  ai: {
    defaultGPTProvider: opt('openai'),
    defaultTemperature: opt(0.9),
    enhancements: opt(true),
    useHistory: opt(true),
    writingCursor: opt(' ...'), // Warning: Using weird characters can mess up Markdown rendering
    proxyUrl: opt(null), // Can be "socks5://127.0.0.1:9050" or "http://127.0.0.1:8080" for example. Leave it blank if you don't need it.
  },

  player: {
    preferred: opt('spotify'),
    visualizer: {
      width: opt(8),
      height: opt(24),
      smooth: opt(true),
    },
    titleLength: {
      popup: opt(36),
      topbar: opt(32),
    }
  },

  notifications: {
    width: opt(440),
    blacklist: opt(['Spotify']),
  },

  workspaces: {
    num: opt(10),
    scale: opt(8),
    showNumber: opt(true),
    substitutes: opt({
      'dev.zed.Zed': 'Zed',
      'vesktop': 'discord',
      'org.gnome.Nautilus': 'files',
      'notion-app-enhanced': 'notion',
      '.blueman-manager-wrapped': 'blueman',
      '.blueman-sendto-wrapped': 'blueman-send',
      '.blueman-adapters-wrapped': 'blueman-adapters',
    })
  },
}
