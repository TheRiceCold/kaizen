import battery from './battery'
import matugen from './matugen'
import hyprland from './hyprland'
import swww from './swww'
import gtk from './gtk'

try {
  gtk()
  swww()
  battery()
  matugen()
  hyprland()
} catch (error) { logError(error) }
