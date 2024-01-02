import { Service, Utils } from '../imports.js'

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

class BrightnessService extends Service {
  static { Service.register(this, { 'screen-changed': ['float'], }, { 'screen-value': ['float', 'rw'], }) }

  _screenValue = 0

  get screen_value() { return this._screenValue }

  set screen_value(percent) {
    percent = clamp(percent, 0, 1)
    this._screenValue = percent

    Utils.execAsync(`brightnessctl s ${percent * 100}% -q`)
      .then(() => {
        this.emit('screen-changed', percent)
        this.notify('screen-value')

      }).catch(print)
  }

  constructor() {
    super()
    const current = Number(Utils.exec('brightnessctl g'))
    const max = Number(Utils.exec('brightnessctl m'))
    this._screenValue = current / max
  }

  connectWidget(widget, callback, event = 'screen-changed') {
    super.connectWidget(widget, callback, event)
  }
}

const service = new BrightnessService()

export default service
