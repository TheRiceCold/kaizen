import { opt } from 'lib/option'

export default {
  position: opt<'top' | 'bottom'>('top'),
  style: opt<'full' | 'separated'>('full'),
  tray: {
    ignore: opt(['KDE Connect Indicator', 'gromit-mpx']),
  },
  date: {
    interval: 5000,
    format: opt('%a %d %b %I:%M %p'),
  },
  indicator: {
    timeoutDuration: opt(300),
    preferredPlayer: opt('spotify'),
    visualizer: {
      smooth: opt(true),
      length: opt<'short' | 'normal' | 'long' | 'auto'>('long'),
    },
  },
}
