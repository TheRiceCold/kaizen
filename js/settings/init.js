// eslint-disable-next-line 
import { Utils } from '../imports.js'
import { options, utils } from '../constants/main.js'
import reloadSass from './reloadSass.js'
import setGlobals from '../settings/globals.js'
import { hyprlandInit, setupHyprland } from './hyprland.js'

export default () => {
  setGlobals()
  // gtkFontSettings()

  reloadSass()
  // hyprlandInit()
  setupHyprland()
  wallpaper()
}

function wallpaper() {
  if (!utils.dependencies(['swww']))
    return

  Utils.execAsync([
    'swww', 'img',
    '--transition-type', 'grow',
    '--transition-pos', 
    Utils.exec('hyprctl cursorpos').replace(' ', ''),
    options.desktop.wallpaper.img.value,
  ]).catch(err => console.error(err))
}

// function gtkFontSettings() {
//   const settings = imports.gi.Gtk.Settings.get_default()
//   if (!settings) {
//     console.error(Error('Gtk.Settings unavailable'))
//     return
//   }

//   const callback = () => {
//     const { size, font } = options.font
//     settings.gtk_font_name = `${font.value} ${size.value}`
//   }

//   options.font.font.connect('notify::value', callback)
//   options.font.size.connect('notify::value', callback)
// }
