import { opt } from 'lib/option'

export default {
  position: opt<'top' | 'bottom'>('top'),
  style: opt<'full' | 'separated'>('full'),
  trayIgnore: opt(['gromit-mpx']),
  date: {
    interval: 5000,
    format: opt('%a %d %b %I:%M %p'),
  },
  indicator: {
    timeoutDuration: opt(300),
    clientTitle: {
      show: opt(false),
      maxLength: opt(64),
    },
    preferredPlayer: opt('spotify'),
    visualizer: {
      smooth: opt(true),
      showFirst: opt(false), // Show first instead of player title
      length: opt<'short' | 'normal' | 'long' | 'auto'>('long'),
    },
  },

  clientSubs: opt([
    'dev.zed.Zed:Zed',
    'vesktop:Discord',
    'org.gnome.Nautilus:files',
    'notion-app-enhanced:notion',
    'org.qutebrowser.qutebrowser:qtbrowser',
    '.blueman-manager-wrapped:blueman',
    '.blueman-sendto-wrapped:blueman-send',
    '.blueman-adapters-wrapped:blueman-adapters',
  ])
}
