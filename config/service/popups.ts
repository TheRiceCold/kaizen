export type PopType =
  | 'ask'
  | 'color'
  | 'draw'
  | 'player'
  | 'capture'
  | 'magnify'
  | 'pomodoro'
  | 'indicator'
  | 'keyboard'
  | 'calendar'
  | 'quicksettings'

class Popup extends Service {
  static {
    Service.register(this, {}, {
      'draw-shown': ['boolean', 'rw'],
      'color-shown': ['boolean', 'rw'],
      'player-shown': ['boolean', 'rw'],
      'capture-shown': ['boolean', 'rw'],
      'indicator-shown': ['boolean', 'rw'],

      'magnify-shown': ['boolean', 'rw'],
      'keyboard-shown': ['boolean', 'rw'],

      'calendar-shown': ['boolean', 'rw'],
      'quicksettings-shown': ['boolean', 'rw'],

      'ask-shown': ['boolean', 'rw'],
    })
  }

  toggle(pop: PopType) {
    this[`${pop}-shown`] = !this[`${pop}-shown`]
  }

  show(pop: PopType) {
    this[`${pop}-shown`] = false
  }

  hide(pop: PopType) {
    this[`${pop}-shown`] = false
  }
}

const popups = new Popup
export default popups

globalThis['popupToggle'] = (pop: PopType) => popups.toggle(pop)
