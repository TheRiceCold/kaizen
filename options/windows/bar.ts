import { type BarWidget } from 'widget/bar/Bar'
import { opt } from 'lib/option'

export default {
  position: opt<'top' | 'bottom'>('top'),
  corners: opt(true),
  layout: {
    start: opt<BarWidget[]>([ 'launcher', 'workspaces' ]),
    center: opt<BarWidget[]>([ 'media' ]),
    end: opt<BarWidget[]>([
      'expander', 'tray', 'settings',
      'datemenu', 'notifs', 'powermenu',
    ]),
  },
  tray: {
    ignore: opt([ 'KDE Connect Indicator' ]),
    direction: opt<'left' | 'right'>('right'),
  },
  media: {
    cava: { bars: 12, width: 8, height: 24 },
    action: opt(() => App.toggleWindow('media')),

    length: opt(20),
    preferred: opt('spotify'),
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
    label: { colored: opt(false), label: opt('Start'), },
  },
  workspaces: {
    workspaces: opt(5),
  },
  taskbar: {
    monochrome: opt(true),
    exclusive: opt(false),
  },
  powermenu: {
    monochrome: opt(false),
    action: opt(() => App.toggleWindow('powermenu')),
  },
}
