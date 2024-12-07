import { exec, monitorFile, readFile } from 'astal'
import GObject, { property, register } from 'astal/gobject'
import { bash } from 'lib/utils'

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

  private _screen = get('get') / get('max')
  private _screenMax = get('max')

  private _kbd =  get(`--device ${kbd} get`)  
  private _kbdMax = get(`--device ${kbd} max`)

  @property(Number)
  get kbd() { return this._kbd }
  set kbd(value: number) {
    if (value < 0 || value > this._kbdMax) return

    this._kbd = get(`-d ${kbd} s ${value} -q`)
    this.notify('kbd')
  }

  @property(Number)
  get screen() { return this._screen }
  set screen(percent: number) {
    if (percent < 0) percent = 0
    if (percent > 1) percent = 1

    this._screen = get(`set ${percent * 100}% -q`)
    this.notify('screen')
  }

  constructor() {
    super()

    const kbdPath = `/sys/class/leds/${kbd}/brightness`
    const screenPath = `/sys/class/backlight/${screen}/brightness`

    monitorFile(kbdPath, (f: string) => {
      this._kbd = Number(readFile(f)) / this._kbdMax
      this.notify('kbd')
    })

    monitorFile(screenPath, (f: string) => {
      this._screen = Number(readFile(f)) / this._screenMax
      this.notify('screen')
    })
  }
}
