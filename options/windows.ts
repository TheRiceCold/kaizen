import { type BarWidget } from 'widget/bar/Bar'
import { opt } from 'lib/option'

export default {
  bar: {
    position: opt<'top' | 'bottom'>('top'),
    corners: opt(true),
    layout: {
      start: opt<BarWidget[]>([
        'launcher', 'workspaces'
      ]),
      center: opt<BarWidget[]>([
        'cava', 'date', 'cava'
      ]),
      end: opt<BarWidget[]>([
        'expander', 'tray', 'battery', 'menu'
      ]),
    },
    cava: {
      bars: 8,
      width: 8,
      height: 24,
      action: opt(() => App.toggleWindow('media')),
    },
    launcher: {
      icon: {
        icon: opt(null),
        colored: opt(false),
      },
      action: opt(() => App.toggleWindow('launcher')),
      label: { colored: opt(false), label: opt('Find'), },
    },
    date: {
      colored: opt(false),
      format: opt('%d/%m %a • %I:%M'),
      action: opt(() => App.toggleWindow('datemenu')),
    },
    utils: {
      colored: opt(false),
      action: opt(() => App.toggleWindow('menu')),
    },
    battery: {
      charging: opt('#93CDA8'),
      percentage: opt(true),
      blocks: opt(7),
      width: opt(32),
      low: opt(30),
    },
    workspaces: {
      workspaces: opt(9),
    },
    taskbar: {
      monochrome: opt(true),
      exclusive: opt(false),
    },
    tray: {
      ignore: opt([ 'KDE Connect Indicator' ]),
    },
    powermenu: {
      monochrome: opt(false),
      action: opt(() => App.toggleWindow('powermenu')),
    },
  },

  launcher: {
    position: opt<'left' | 'center' | 'right'>('left'),
    iconSize: opt(48),
    width: opt(0),
    margin: opt(80),
    maxItem: opt(5),
    favorites: opt([
      'firefox',
      'spotify',
      'discord',
      'neovide',
      'godot',
      'krita',
      'blender',
      'inkscape',
    ]),
  },

  overview: {
    scale: opt(9),
    workspaces: opt(9),
    monochromeIcon: opt(true),
  },

  powermenu: {
    sleep: opt('systemctl suspend'),
    reboot: opt('systemctl reboot'),
    logout: opt('pkill Hyprland'),
    shutdown: opt('shutdown now'),
    layout: opt<'line' | 'box'>('line'),
    labels: opt(true),
  },

  menu: {
    width: opt(380),
    dashboard: {
      avatar: {
        image: opt(`/var/lib/AccountsService/icons/${Utils.USER}`),
        size: opt(70),
      },
    },
    position: opt<'left' | 'center' | 'right'>('right'),
    tab: opt<'dashboard' | 'utilities' | 'apis' | 'settings'>('dashboard'),
  },

  datemenu: {
    position: opt<'left' | 'center' | 'right'>('center'),
  },

  media: {
    coverSize: opt(100),
    monochromeIcon: opt(true),
    position: opt<'left' | 'center' | 'right'>('center'),
  },

  osd: {
    progress: {
      vertical: opt(false),
      pack: {
        h: opt<'start' | 'center' | 'end'>('center'),
        v: opt<'start' | 'center' | 'end'>('start'),
      },
    },
    microphone: {
      pack: {
        h: opt<'start' | 'center' | 'end'>('center'),
        v: opt<'start' | 'center' | 'end'>('end'),
      },
    },
  },

  notifications: {
    position: opt<Array<'top' | 'bottom' | 'left' | 'right'>>(['top']),
    blacklist: opt(['Spotify']),
    width: opt(440),
  },
}
