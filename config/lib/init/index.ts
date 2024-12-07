import style from './style'
import shaders from './shaders'
import hyprland from './hyprland'
import wallpaper from './wallpaper'

import keybinds from 'lib/keybinds'

try {
  style()
  shaders()
  hyprland()
  keybinds()
  wallpaper()
} catch(err) {
  console.error(err.message)
}
