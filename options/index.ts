import { opt, mkOptions } from 'lib/option'
import windows from './windows'
import theme from './theme'
import fonts from './fonts'
import api from './api'

export default mkOptions(OPTIONS, {
  autotheme: opt(true),
  wallpaper: opt(`/home/${USER}/.config/background`, { persistent: true }),
  transition: opt(200),

  hyprland: {
    gaps: opt(1.5),
    gapsWhenOnly: opt(true),
    inactiveBorder: opt('333333ff'),
  },

  ...api,
  ...fonts,
  ...theme,
  ...windows,
})
