import notifications from './notifications'
import hyprland from './hyprland'
import battery from './battery'
import matugen from './matugen'
import swww from './swww'
import gtk from './gtk'

try {
  gtk()
  swww()
  battery()
  matugen()
  hyprland()
  notifications()
} catch (error) { logError(error) }
