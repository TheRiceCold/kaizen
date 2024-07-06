import { opt } from 'lib/option'
import dashboard from './dashboard'

export default {
  dashboard: {...dashboard},

  sideright: { width: opt(380) },
  topbar: {
    tray: {
      ignore: opt([ 'KDE Connect Indicator', 'gromit-mpx' ]),
    },
    date: {
      interval: 5000,
      format: opt('%a %d %b %I:%M %p'),
    },
  },

  run: {
    position: opt<'left' | 'center' | 'right'>('left'),
    iconSize: opt(48),
    width: opt(0),
    margin: opt(40),
    maxItem: opt(5),
    nix: {
      max: opt(8),
      pkgs: opt('nixpkgs/nixos-unstable'),
    },
    sh: {
      max: opt(16),
    },
    apps: {
      max: opt(6),
      iconSize: opt(62),
    },
  },

  lockscreen: {
    player: opt(true),
    quotes: opt(true),
    weather: opt(true),
    crypto: opt(true),
    system: opt(true),
  },

  powermenu: {
    sleep: opt('systemctl suspend'),
    reboot: opt('systemctl reboot'),
    logout: opt('pkill Hyprland'),
    shutdown: opt('shutdown now'),
  },
}
