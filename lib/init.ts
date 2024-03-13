import matugen from './matugen'
import hyprland from './hyprland'
import gtk from './gtk'
import lowBattery from './battery'
import swww from './swww'

try {
  gtk()
  matugen()
  lowBattery()
  hyprland()
  swww()
} catch (error) { logError(error) }
