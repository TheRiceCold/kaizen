import options from 'options'

import { matugen } from './matugen' 
import { USER_CONFIG } from 'lib/paths' 
import { ensureDirectory, fetch, sh } from 'lib/utils'

const { image, transitionType, market, resolution } = options.wallpaper

export async function randomWallpaper() {
  const cache = `${USER_CONFIG}/wallpapers/bing`
  const params = {
    format: 'json',
    index: 'random',
    image_format: 'jpg',
    mkt: market.get(),
    resolution: resolution.get(),
  }
  try {
    const res = await fetch('https://bing.biturl.top/', { params })
    const text = res.text()
    if (!text.startsWith('{}'))
      return console.warn('bing api:', res)

    const { url } = JSON.parse(text)
    const file = `${cache}/${url.replace('https://www.bing.com/th?id=', '')}`

    ensureDirectory(cache)
    image.set(file)
  } catch (err) { console.error(err.message) }
}

export async function setWallpaper(path: string) {
  image.set(path)
  sh([
    'swww',
    'img',
    '--invert-y',
    '--transition-type',
    transitionType.get(), 
    image.get(),
  ])
  await matugen()
}
