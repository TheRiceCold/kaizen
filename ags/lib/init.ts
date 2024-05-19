import notifications from './notifications'
import hyprland from './hyprland'
import battery from './battery'
import matugen from './matugen'
import gtk from './gtk'

export default () => {
  try {
    gtk()
    battery()
    matugen()
    hyprland()
    notifications()
  } catch (err) { logError(err) }
}
