import { type BarWidget } from 'widget/bar/Bar'
import { opt } from 'lib/option'

export default {
  position: opt<'top' | 'bottom'>('top'),
  layout: {
    start: opt<BarWidget[]>([ 'launcher', 'workspaces' ]),
    end: opt<BarWidget[]>([ 'tray', 'notifs', 'settings', 'profile', 'datemenu' ]),
  },
  tray: {
    ignore: opt([ 'KDE Connect Indicator' ]),
  },
  media: {
    length: opt(20),
    cava: { bars: opt(16), width: opt(8), height: opt(24) },
  },
  datemenu: {
    interval: 5000,
    // DOCS: https://docs.gtk.org/glib/method.DateTime.format.html
    format: opt('%a %d  %I:%M'),
    action: opt(() => {
      App.toggleWindow('datemenu')
      App.closeWindow('dropmenu')
    }),
  },
  settings: {
    colored: opt(false),
    action: opt(() => {
      App.toggleWindow('dropmenu')
      App.closeWindow('datemenu')
    }),
  },
  launcher: {
    icon: {
      icon: opt(null),
      colored: opt(false),
    },
    action: opt(() => App.toggleWindow('launcher')),
    label: { colored: opt(false), label: opt('Launch'), },
  },
  workspaces: {
    label: opt('Workspace: '),
    items: opt([ 'develop', 'browser', 'media', 'social', 'extra' ]),
  },
  profilemenu: {
    action: opt(() => App.toggleWindow('profilemenu')),
  },
}
