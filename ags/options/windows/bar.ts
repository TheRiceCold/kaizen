import { opt } from 'lib/option'

export default {
  tray: {
    ignore: opt([ 'KDE Connect Indicator', 'gromit-mpx' ]),
  },
  media: {
    length: opt(32),
    visualizer: { width: opt(8), height: opt(24) },
  },
  datemenu: {
    interval: 5000,
    // DOCS: https://docs.gtk.org/glib/method.DateTime.format.html
    format: opt('%a %d %b %I:%M %p'),
  },
  power: {
    action: opt(() => App.toggleWindow('powermenu')),
  },
  profilemenu: {
    action: opt(() => App.toggleWindow('profilemenu')),
  },
}
