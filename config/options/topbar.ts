import { opt } from 'lib/option'

export default {
  tray: {
    ignore: opt(['KDE Connect Indicator', 'gromit-mpx']),
  },
  date: {
    interval: 5000,
    format: opt('%a %d %b %I:%M %p'),
  },
  player: {
    preferred: opt('spotify'),
    visualizer: {
      smooth: opt(true),
      length: opt<'short' | 'normal' | 'long' | 'auto'>('long'),
    },
  },
}
