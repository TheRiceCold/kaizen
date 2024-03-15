import { type BarWidget } from 'widget/bar/Bar'
import { opt } from 'lib/option'

export default {
  position: opt<'top' | 'bottom'>('top'),
  corners: opt(true),
  layout: {
    start: opt<BarWidget[]>([ 'launcher', 'workspaces' ]),
    center: opt<BarWidget[]>([ 'media' ]),
    end: opt<BarWidget[]>([ 'expander', 'tray', 'battery', 'date', 'dropmenu' ]),
  },
  tray: {
    ignore: opt([ 'KDE Connect Indicator' ]),
  },
  media: {
    cava: { bars: 12, width: 8, height: 24 },
    action: opt(() => App.toggleWindow('media')),

    length: opt(20),
    preferred: opt('spotify'),
  },
  date: {
    colored: opt(false),
    format: opt('%d %a, %I:%M'),
    action: opt(() => {
      App.toggleWindow('datemenu')
      App.closeWindow('dropmenu')
    }),
  },
  dropmenu: {
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
    workspaces: opt(9),
  },
  battery: {
    charging: opt('#93CDA8'),
    percentage: opt(true),
    blocks: opt(7),
    width: opt(28),
    low: opt(30),
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
