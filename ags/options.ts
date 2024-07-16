import { opt, mkOptions } from 'lib/option'
import quotes from 'data/quotes'

const options = mkOptions(OPTIONS, {

  autotheme: opt(true),
  transition: opt(200),
  avatar: opt(`/var/lib/AccountsService/icons/${Utils.USER}`),

  theme: {
    dark: {
      primary: {
        bg: opt('#6AAAFF'),
        fg: opt('#141414'),
      },
      error: {
        bg: opt('#D67A96'),
        fg: opt('#141414'),
      },
      bg: opt('#373559'),
      fg: opt('#eeeeee'),
      widget: opt('#eeeeee'),
      border: opt('#eeeeee'),
    },
    light: {
      primary: {
        bg: opt('#6AAAFF'),
        fg: opt('#eeeeee'),
      },
      error: {
        bg: opt('#D67A96'),
        fg: opt('#eeeeee'),
      },
      bg: opt('#fffffa'),
      fg: opt('#171717'),
      widget: opt('#080808'),
      border: opt('#080808'),
    },

    blur: opt(4),
    scheme: opt<'dark' | 'light'>('dark'),
    widget: { opacity: opt(94) },
    border: {
      width: opt(1),
      opacity: opt(96),
    },

    colors: {
      black: opt('#12101E'),
    },

    shadows: opt(true),
    padding: opt(4),
    spacing: opt(8),
    radius: opt(0),
  },

  hyprland: {
    gaps: opt(1.5),
    gapsWhenOnly: opt(false),
    inactiveBorder: opt('333333ff'),
    shader: opt<TShader>('default'),
  },

  wallpaper: {
    market: opt<import('service/wallpaper').Market>('random'),
    resolution: opt<import('service/wallpaper').Resolution>(1920),
  },

  font: {
    default: {
      size: opt(10),
      name: opt('Ubuntu Nerd Font'),
    },
  },

  quotes: opt(quotes),

  ai: {
    defaultGPTProvider: opt('openai'),
    defaultTemperature: opt(0.9),
    enhancements: opt(true),
    useHistory: opt(true),
    writingCursor: opt(' ...'), // Warning: Using weird characters can mess up Markdown rendering
    proxyUrl: (''), // Can be "socks5://127.0.0.1:9050" or "http://127.0.0.1:8080" for example. Leave it blank if you don't need it.
  },

  player: {
    preferred: opt('spotify'),
    visualizer: {
      width: opt(8),
      height: opt(24),
      smooth: opt(true),
    },
    titleLength: {
      popup: opt(36),
      topbar: opt(32),
    }
  },

  notifications: {
    width: opt(440),
    blacklist: opt(['Spotify']),
  },

  workspaces: {
    num: opt(10),
    scale: opt(8),
    showNumber: opt(true),
    substitutes: opt({
      'dev.zed.Zed': 'Zed',
      'vesktop': 'discord',
      'org.gnome.Nautilus': 'files',
      'notion-app-enhanced': 'notion',
      '.blueman-manager-wrapped': 'blueman',
      '.blueman-sendto-wrapped': 'blueman-send',
      '.blueman-adapters-wrapped': 'blueman-adapters',
    })
  },

  dashboard: {
    tasksDirectory: opt(''),
    githubUser: opt('TheRiceCold'),
    photo: opt(`/home/${Utils.USER}/photo-sample.jpg`),
    bio: opt('~ What we do in life, echoes in eternity ~'),
    player: {
      length: opt(32),
      coverSize: opt(200),
    },

    apps: opt([
      [
        'firefox', 'spotify',
        { label: 'discord', icon: 'discord', name: 'vesktop' },
        { label: 'chrome', name: 'google-chrome-stable' },
        'obs',
      ],

      [
        'zed', 'neovide', 'insomnia',
        { label: 'godot', name: 'godot4' },
        { label: 'Android Studio', name: 'android-studio' },
      ],

      [
        'krita', 'gimp', 'blender', 'inkscape',
        { label: 'Libre Sprite', name: 'libresprite' }
      ],

      [
        { label: 'shell', name: 'foot' },
        { label: 'files', name: 'nautilus' },
        { label: 'calc', name: 'gnome-calculator' },
        { label: 'Virtual Machine Manager', name: 'virt-manager' },
      ]
    ]),
  },

  sideright: { width: opt(380) },
  topbar: {
    tray: {
      ignore: opt(['KDE Connect Indicator', 'gromit-mpx']),
    },
    date: {
      interval: 5000,
      format: opt('%a %d %b %I:%M %p'),
    },
  },

  run: {
    execCmd: opt(''),
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
})

globalThis['options'] = options
export default options
