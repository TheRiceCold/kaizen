import { exec, monitorFile, readFile } from 'astal'
import GObject, { property, register } from 'astal/gobject'
import { sh, bash } from 'utils'

const get = (args: string) => Number(exec(`brightnessctl ${args}`))
const kbd = await bash`ls -w1 /sys/class/leds | head -1`
const screen = await bash`ls -w1 /sys/class/backlight | head -1`

@register()
export default class Brightness extends GObject.Object {
  static instance: Brightness
  static get_default(): Brightness {
    if (!this.instance) this.instance = new Brightness()
    return this.instance
  }

  #kbdMax = get(`--device ${kbd} max`)
  #kbd = get(`--device ${kbd} get`)
  #screenMax = get('max')
  #screen = get('get') / get('max')

  @property(Number)
  get kbd() { return this.#kbd }
  set kbd(value: number) {
    if (value < 0 || value > this.#kbdMax) return

    this.#kbd = get(`-d ${kbd} s ${value} -q`)
    this.changed('kbd')
  }

  @property(Number)
  get screen() { return this.#screen }
  set screen(percent: number) {
    if (percent < 0) percent = 0
    if (percent > 1) percent = 1

    this.#screen = get(`set ${percent * 100}% -q`)
    this.notify('screen')
  }

  constructor() {
    super()

    const kbdPath = `/sys/class/leds/${kbd}/brightness`
    const screenPath = `/sys/class/backlight/${screen}/brightness`

    monitorFile(kbdPath, (f: string) => {
      this.#kbd = Number(readFile(f)) / this.#kbdMax
      this.notify('kbd')
    })

    monitorFile(screenPath, (f: string) => {
      this.#screen = Number(readFile(f)) / this.#screenMax
      this.notify('screen')
    })
  }
}
