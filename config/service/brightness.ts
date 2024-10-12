import { bash, dependencies, sh } from 'lib/utils'

if (!dependencies('brightnessctl'))
  App.quit()

const get = (args: string) => Number(Utils.exec(`brightnessctl ${args}`))
const screen = await bash`ls -w1 /sys/class/backlight | head -1`
const kbd = await bash`ls -w1 /sys/class/leds | head -1`

class Brightness extends Service {
  static {
    Service.register(this, {}, {
      screen: ['float', 'rw'],
      kbd: ['int', 'rw']
    })
  }

  _kbdMax = get(`--device ${kbd} max`)
  _kbd = get(`--device ${kbd} get`)
  _screenMax = get('max')
  _screen = get('get') / get('max')

  get kbd() { return this._kbd }
  get screen() { return this._screen }

  set kbd(value) {
    if (value < 0 || value > this._kbdMax) return

    sh(`brightnessctl -d ${kbd} s ${value} -q`).then(() => {
      this._kbd = value
      this.changed('kbd')
    })
  }

  set screen(percent) {
    if (percent < 0) percent = 0
    if (percent > 1) percent = 1

    sh(`brightnessctl set ${Math.floor(percent * 100)}% -q`).then(() => {
      this._screen = percent
      this.changed('screen')
    })
  }

  constructor() {
    super()

    const screenPath = `/sys/class/backlight/${screen}/brightness`
    const kbdPath = `/sys/class/leds/${kbd}/brightness`

    Utils.monitorFile(screenPath, async f => {
      const v = await Utils.readFileAsync(f)
      this._screen = Number(v) / this._screenMax
      this.changed('screen')
    })

    Utils.monitorFile(kbdPath, async f => {
      const v = await Utils.readFileAsync(f)
      this._kbd = Number(v) / this._kbdMax
      this.changed('kbd')
    })
  }
}

export default new Brightness
