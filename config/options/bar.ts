import { opt } from 'variables/option'

export default {
  position: opt<'top' | 'bottom'>('top'),
  style: opt<'full' | 'separated'>('full'),
  trayIgnore: opt(['gromit-mpx']),
  date: {
    interval: opt(1000),
    format: opt('%a %d %b %I:%M %p'),
  },
  clientClassSubs: opt([
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
