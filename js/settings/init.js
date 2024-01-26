// eslint-disable-next-line 
import reloadSass from './reloadSass.js'
import setGlobals from '../settings/globals.js'
import initWallpaper from './wallpaper.js'
import { hyprlandInit, setupHyprland } from './hyprland.js'
// import { setupNeovim } from './editors.js'

export default () => {
  setGlobals()

  reloadSass()
  hyprlandInit()
  setupHyprland()
  initWallpaper()
  // setupNeovim()
}
