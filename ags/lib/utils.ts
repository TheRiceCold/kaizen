import { type Application } from 'ts/types/service/applications'
import { substitutes } from 'data/icons'
import options from 'options'

const { GLib, Gio } = imports.gi
const mpris = await Service.import('mpris')

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
  return range(n, 0).flatMap(widget)
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

const fileExists = (path: string)  => Gio.File.new_for_path(path).query_exists(null)

const expandTilde = (path: string) =>
  path.startsWith('~') ? GLib.get_home_dir() + path.slice(1) : path

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)

const clamp = (x: number, min: number, max: number) => Math.min(Math.max(x, min), max)

const copy = (input: string) => sh(['wl-copy', input])

function enableClickThrough(self){
  const dummyRegion = new imports.gi.cairo.Region()
  self.input_shape_combine_region(dummyRegion)
}

const audioIconSub = (item: string, type: 'microphone' | 'speaker') => {
  const microphoneSubstitutes = {
    'audio-headset-analog-usb': 'audio-headset-symbolic',
    'audio-headset-bluetooth': 'audio-headphones-symbolic',
    'audio-card-analog-usb': 'audio-input-microphone-symbolic',
    'audio-card-analog-pci': 'audio-input-microphone-symbolic',
    'audio-card-analog': 'audio-input-microphone-symbolic',
    'camera-web-analog-usb': 'camera-web-symbolic'
  }
  const substitutes = {
    'audio-headset-bluetooth': 'audio-headphones-symbolic',
    'audio-card-analog-usb': 'audio-speakers-symbolic',
    'audio-card-analog-pci': 'audio-speakers-symbolic',
    'audio-card-analog': 'audio-speakers-symbolic',
    'audio-headset-analog-usb': 'audio-headset-symbolic'
  }

  if (type === 'speaker') {
    return substitutes[item] || item
  }
  return microphoneSubstitutes[item] || item
}

function getAllFiles(dir: string, files = []) {
  const exists = (path: string) => Gio.File.new_for_path(path).query_exists(null)

  if (!exists(dir)) return []
  const file = Gio.File.new_for_path(dir)
  const enumerator = file.enumerate_children('standard::name,standard::type', Gio.FileQueryInfoFlags.NONE, null)

  for (const info of enumerator) {
    if (info.get_file_type() === Gio.FileType.DIRECTORY)
      files.push(getAllFiles(`${dir}/${info.get_name()}`))
    else
      files.push(`${dir}/${info.get_name()}`)
  }

  return files.flat(1)
}

function levenshteinDistance(a, b) {
  if (!a.length) return b.length
  if (!b.length) return a.length

  const f = Array.from(new Array(a.length + 1), () => new Array(b.length + 1).fill(0))

  for (let i = 0; i <= b.length; i++) f[0][i] = i
  for (let i = 0; i <= a.length; i++) f[i][0] = i

  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) {
      if (a.charAt(i - 1) === b.charAt(j - 1))
        f[i][j] = f[i-1][j-1]
      else
        f[i][j] = Math.min(f[i-1][j-1], Math.min(f[i][j-1], f[i-1][j])) + 1
    }

  return f[a.length][b.length]
}

function searchIcons(appClass, files) {
  appClass = appClass.toLowerCase()

  if (!files.length) { return '' }

  let appro = 0x3f3f3f3f
  let path = ''

  for (const item of files) {
    const score = levenshteinDistance(item.split('/').pop().toLowerCase().split('.')[0], appClass)

    if (score < appro) {
      appro = score
      path = item
    }
  }

  return path
}

function getPlayer() {
  const pref = options.popups.player.preferred.value
  return mpris.getPlayer(pref) || null
}

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
  enableClickThrough,
  audioIconSub,

  getPlayer,

  // DOCK
  getAllFiles,
  searchIcons,
}
