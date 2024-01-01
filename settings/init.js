import options from '../options.js'
import reloadSass from './reloadSass.js'
import setGlobals from '../settings/globals.js'

export default () => {
  reloadSass()
  setGlobals()
  // gtkFontSettings()
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
