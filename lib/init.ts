import matugen from './matugen'
import hyprland from './hyprland'
import gtk from './gtk'
import swww from './swww'

try {
  gtk()
  matugen()
  hyprland()
  swww()
} catch (error) { logError(error) }
