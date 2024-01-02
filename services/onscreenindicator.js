import { Utils, Service, Audio } from '../imports.js'
import Brightness from './Brightness.js'
import { getAudioTypeIcon } from '../utils.js'
import icons from '../icons.js'

class Indicator extends Service {
  static { Service.register(this, { 'popup': ['double', 'string'] }) }

  #count = 0
  #delay = 1500

  popup(value, icon) {
    this.emit('popup', value, icon)
    this.#count++
    Utils.timeout(this.#delay, () => {
      this.#count--
      if (this.#count === 0) 
        this.emit('popup', -1, icon)
    })
  }

  speaker() {
    this.popup(
      Audio.speaker?.volume || 0,
      getAudioTypeIcon(Audio.speaker?.icon_name || ''),
    )
  }

  display() {
    Utils.timeout(10, () => this.popup(Brightness.screen, icons.brightness.screen))
  }

  kbd() {
    Utils.timeout(10, () => this.popup((Brightness.kbd * 33 + 1) / 100, icons.brightness.keyboard))
  }

  connect(event = 'popup', callback) {
    return super.connect(event, callback)
  }
}

export default new Indicator()
