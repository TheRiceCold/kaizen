import notifications from './notifications'
import hyprland from './hyprland'
import battery from './battery'
import matugen from './matugen'
import gromit from './gromit'
import gtk from './gtk'

export default () => {
  try {
    gtk()
    gromit()
    battery()
    matugen()
    hyprland()
    notifications()
  } catch (err) { logError(err) }
}
