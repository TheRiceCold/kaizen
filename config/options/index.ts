import { opt } from 'variables/option'
import { sh, createOptions } from 'lib/utils'

import bar from './bar'
import style from './style'
import keybinds from './keybinds'
import hyprland from './hyprland' 
import wallpaper from './wallpaper'

export default createOptions({
  transition: opt(200),
  roundedCorners: opt(true),
  numberOfWorkspace: opt(8),
  avatar: opt('ibu-cyber.jpg'),
  autoGenerateColors: opt(true),
  screenRoundedCorners: opt(false),

  font: {
    default: {
      size: opt(10),
      name: opt('Ubuntu Nerd Font'),
    }
  },

  bar: {...bar},
  style: {...style},
  hyprland: {...hyprland},
  keybinds: {...keybinds},
  wallpaper: {...wallpaper},

  indicator: {
    timeoutDuration: opt(500),
    clientTitle: {
      show: opt(false),
      maxLength: opt(64),
    },
    preferredPlayer: opt('spotify'),
    visualizer: {
      smooth: opt(true),
      showFirst: opt(false), // Show first instead of player title
      length: opt<'short' | 'normal' | 'long' | 'auto'>('long'),
    },
  },
})
