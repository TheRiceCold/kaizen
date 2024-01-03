import { Utils } from '../imports.js'
import options from '../options.js'
import { dependencies } from '../utils.js'

export function initWallpaper() {
  if (dependencies(['swww'])) {
    Utils.exec('swww init')

    options.desktop.wallpaper.img.connect('changed', wallpaper)
  }
}

export function wallpaper() {
  if (!dependencies(['swww']))
    return

  Utils.execAsync([
    'swww', 'img',
    '--transition-type', 'grow',
    '--transition-pos', 
    Utils.exec('hyprctl cursorpos').replace(' ', ''),
    options.desktop.wallpaper.img.value,
  ]).catch(err => console.error(err))
}
