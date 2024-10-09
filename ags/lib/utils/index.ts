import { range } from './array'

function forMonitors(widget: (monitor: number) => Gtk.Window) {
  const n = imports.gi.Gdk.Display.get_default().get_n_monitors() || 1
  return range(n, 0).flatMap(widget)
}

function enableClickThrough(self) {
  const dummyRegion = new imports.gi.cairo.Region()
  self.input_shape_combine_region(dummyRegion)
}

function dependencies(...bins: string[]) {
  const missing = bins.filter((bin) =>
    Utils.exec({ cmd: `which ${bin}`, out: () => false, err: () => true }),
  )

  if (missing.length > 0) {
    console.warn(Error(`missing dependencies: ${missing.join(', ')}`))
    Utils.notify(`missing dependencies: ${missing.join(', ')}`)
  }

  return missing.length === 0
}

const fileExists = (path: string) =>
  imports.gi.Gio.File.new_for_path(path).query_exists(null)

const expandTilde = (path: string) =>
  path.startsWith('~') ? imports.gi.GLib.get_home_dir() + path.slice(1) : path

export {
  forMonitors,
  dependencies,
  fileExists,
  expandTilde,
  enableClickThrough,
}

export { clamp } from './math'
export { capitalize } from './string'
export { getCalendarLayout } from './calendar'
export { setIcon, audioIconSub } from './icon'
export { sh, bash, copy, launchApp } from './cmd'
export { markdownTest, md2pango } from './markdown'
export { range, findCommonElement, uniqueArray } from './array'
export { createSurfaceFromWidget } from './createSurfaceFromWidget'
