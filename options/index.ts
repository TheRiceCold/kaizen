import { opt, mkOptions } from 'lib/option'
import windows from './windows'
import theme from './theme'
import fonts from './fonts'

export default mkOptions(OPTIONS, {
  autotheme: opt(true),
  wallpaper: opt(`/home/${USER}/.config/background`, { persistent: true }),
  transition: opt(200),

  hyprland: {
    gaps: opt(2),
    gapsWhenOnly: opt(false),
    inactiveBorder: opt('333333ff'),
  },

  ...fonts,
  ...theme,
  ...windows,
})
