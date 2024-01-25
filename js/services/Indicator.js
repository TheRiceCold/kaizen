import { Service, Utils, Audio } from '../imports.js'
import { Brightness } from './main.js'

class IndicatorService extends Service {
  static { 
    Service.register( 
      this, 
      { 'popup': ['double'] },
      {
        'brightness': [ 'float', 'rw'],
        'volume': [ 'float', 'rw'],
        'current': ['string', 'r'],
      }
    ) 
  }

  _count = 0
  _delay = 1500
  _current = 'volume'
  _volume = 0

  constructor() {
    super()
    Brightness.connect('notify::screen-value', () => {
      this._current = 'brightness'
      this.notify('brightness')
      this.notify('current')
      this.popup()
    })

    Audio.connect('speaker-changed', () => {
      if(!Audio.speaker || Audio.speaker.volume == this._volume) return
      this._current = 'volume'
      this._volume = Audio.speaker.volume
      this.notify('volume')
      this.notify('current')
      this.popup()
    });
  }

  get current() { return this._current }

  get brightness() { return Brightness.screen_value }
  set brightness(value) { Brightness.screen_value = value }

  get volume() { return this._volume }
  set volume(value) {
    if (!Audio.speaker) return
    Audio.speaker.volume = value
  }

  popup(value = 1) {
    this.emit('popup', value)
    this._count++
    Utils.timeout(this._delay, () => {
      this._count--

      if (this._count === 0)
        this.emit('popup', -1)
    });
  }

  connect(event = 'popup', callback) {
    return super.connect(event, callback)
  }
}

const service = new IndicatorService()
export default service
