import { execAsync } from 'astal'
import { setWallpaper } from 'lib/wallpaper'

import options from 'options'

const { image } = options.wallpaper

export default() => {
  execAsync('swww-daemon').catch(() => null)
  setWallpaper(image.get())
  image.subscribe(img => setWallpaper(img))
}
