import style from 'style/style'
import matugen from './matugen'
import hyprland from './hyprland'
import gtk from './gtk'
import lowBattery from './battery'
import wallpaper from './swww'

export async function init() {
  try {
    gtk()
    style()
    matugen()
    lowBattery()
    hyprland()
    style()
    wallpaper()
  } catch (err) { logError(err) }
}
