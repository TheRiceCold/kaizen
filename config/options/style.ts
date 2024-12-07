import { opt } from 'variables/option'

export default {
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

  scheme: opt<'dark' | 'light'>('dark'),
  widget: { opacity: opt(94) },
  border: {
    width: opt(1),
    opacity: opt(96),
  },
  blur: opt(4),
  shadows: opt(true),

  radius: opt(16),
  spacing: opt(8),
}
