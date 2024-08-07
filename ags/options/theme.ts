import { opt } from 'lib/option'

type TShader =
  | 'default'
  | 'blue light'
  | 'grayscale'
  | 'invert'

export default {
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
}
