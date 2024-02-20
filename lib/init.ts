import css from 'style/style'
import matugen from './matugen'
import hyprland from './hyprland'
import gtk from './gtk'
import lowBattery from './battery'
import swww from './swww'

export async function init() {
  try {
    gtk()
    css()
    matugen()
    lowBattery()
    hyprland()
    css()
    swww()
  } catch (error) { logError(error) }
}
