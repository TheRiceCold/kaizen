import { type Application } from 'ts/types/service/applications'
import { substitutes } from 'data/icons'

const { GLib } = imports.gi

/** @returns substitute icon || name || fallback icon */
function icon(name: string | null, fallback = name) {
  if (!name) return fallback || ''

  if (GLib.file_test(name, GLib.FileTest.EXISTS)) return name

  const icon = (substitutes[name] || name)
  if (Utils.lookUpIcon(icon)) return icon

  print(`no icon substitute '${icon}' for '${name}', fallback: '${fallback}'`)
  return fallback
}

/** @returns execAsync(['bash', '-c', cmd]) */
async function bash(strings: TemplateStringsArray | string, ...values: unknown[]) {
  const cmd = typeof strings === 'string' ? strings : strings
    .flatMap((str, i) => str + `${values[i] ?? ''}`).join('')

  return Utils.execAsync(['bash', '-c', cmd]).catch(err => {
    console.error(cmd, err)
    return ''
  })
}

/** @returns execAsync(cmd) */
const sh = async (
  cmd: string | string[]
) => Utils.execAsync(cmd).catch(err => {
  console.error(typeof cmd === 'string' ? cmd : cmd.join(' '), err)
  return ''
})

/** @returns [start...length] */
const range = (length: number, start = 1) => Array.from({ length }, (_, i) => i + start)

function forMonitors(widget: (monitor: number) => Gtk.Window) {
  const n = imports.gi.Gdk.Display.get_default().get_n_monitors() || 1
  return range(n, 0).map(widget).flat(1)
}

/** @returns true if all of the `bins` are found */
function dependencies(...bins: string[]) {
  const missing = bins.filter(bin => !Utils.exec(`which ${bin}`))

  if (missing.length > 0)
    Utils.notify(`missing dependencies: ${missing.join(', ')}`)

  return missing.length === 0
}

/** run app detached */
function launchApp(app: Application) {
  const exe = app.executable
    .split(/\s+/)
    .filter((str: string) => !str.startsWith('%') && !str.startsWith('@'))
    .join(' ')

  sh(exe)
  app.frequency += 1
}

const createSurfaceFromWidget = (widget: Gtk.Widget) => {
  const cairo = imports.gi.cairo
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

const fileExists = (path: string)  =>
  imports.gi.Gio.File.new_for_path(path).query_exists(null)

const expandTilde = (path: string) =>
  path.startsWith('~') ? GLib.get_home_dir() + path.slice(1) : path

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)

const clamp = (x: number, min: number, max: number) => Math.min(Math.max(x, min), max)

const copy = (input: string) => sh(['wl-copy', input])

export {
  icon,
  bash,
  sh,
  range,
  forMonitors,
  dependencies,
  launchApp,
  createSurfaceFromWidget,
  fileExists,
  expandTilde,
  capitalize,
  clamp,
  copy,
}
