import { opt } from 'lib/option'

export default {
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
}
