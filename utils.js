import { Utils } from './imports.js'
import cairo from 'cairo'
import icons from './icons.js'

const { GLib } = imports.gi

export const range = (length, start = 1) => 
  Array.from({ length }, (_, i) => i + start)

export const substitute = (collection, item) => 
  collection.find(([from]) => from === item)?.[1] || item

export const createSurfaceFromWidget = widget => {
  const alloc = widget.get_allocation()
  const surface = new cairo.ImageSurface(
    cairo.Format.ARGB32,
    alloc.width,
    alloc.height,
  )
  const cr = new cairo.Context(surface)
  cr.setSourceRGBA(255, 255, 255, 0)
  cr.rectangle(0, 0, alloc.width, alloc.height)
  cr.fill()
  widget.draw(cr)

  return surface
}


export function getAudioTypeIcon(icon) {
  const substitues = [
    ['audio-headset-bluetooth', icons.audio.type.headset],
    ['audio-card-analog-usb', icons.audio.type.speaker],
    ['audio-card-analog-pci', icons.audio.type.card],
  ]

  return substitute(substitues, icon)
}


export function dependencies(bins) {
  const deps = bins.map(bin => {
    const has = Utils.exec(`which ${bin}`)
    if (!has) print(`missing dependency: ${bin}`)

    return !!has
  })

  return deps.every(has => has)
}

export function blurImg(img) {
  const cache = Utils.CACHE_DIR + '/media'
  return new Promise(resolve => {
    if (!img) resolve('')

    const dir = cache + '/blurred'
    const blurred = dir + img.substring(cache.length)

    if (GLib.file_test(blurred, GLib.FileTest.EXISTS))
      return resolve(blurred)

    Utils.ensureDirectory(dir)
    Utils.execAsync(['convert', img, '-blur', '0x22', blurred])
      .then(() => resolve(blurred))
      .catch(() => resolve(''))
  })
}
