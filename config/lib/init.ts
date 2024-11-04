import notifications from './notifications'
import writeShaders from './writeShaders'
import addAssets from './addAssets'
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
    addAssets()
    writeShaders()
    notifications()
  } catch (err) { logError(err) }
}
