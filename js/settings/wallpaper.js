import { options, utils } from '../constants/main.js'

const { exec, execAsync } = Utils
const depsExist = utils.dependencies(['swww'])

export function applyWallpaper() {
  if (!depsExist) return
  execAsync([
    'swww', 'img',
    '--transition-type', 'grow',
    '--transition-pos', 
    exec('hyprctl cursorpos').replace(' ', ''),
    options.desktop.wallpaper.img.value,
  ]).catch(err => console.error(err))
}

export default () => {
  if (!depsExist) return

  exec('swww init')
  // options.desktop.wallpaper.img.connect('changed', wallpaper)
  applyWallpaper()
}
