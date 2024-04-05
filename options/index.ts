import { opt, mkOptions } from 'lib/option'
import windows from './windows'
import theme from './theme'
import fonts from './fonts'
import api from './api'

export default mkOptions(OPTIONS, {
  autotheme: opt(true),
  transition: opt(200),

  hyprland: {
    gaps: opt(1.5),
    gapsWhenOnly: opt(true),
    inactiveBorder: opt('333333ff'),
    shade: {
      blueLight: opt(false)
    }
  },

  ...api,
  ...fonts,
  ...theme,
  ...windows,
})
