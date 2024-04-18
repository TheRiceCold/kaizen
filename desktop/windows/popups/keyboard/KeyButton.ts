import { setupCursorHover } from 'misc/cursorhover'

class ShiftMode {
  static Off = new ShiftMode('Off')
  static Normal = new ShiftMode('Normal')
  static Locked = new ShiftMode('Locked')

  constructor(name) {
    this.name = name
  }
  toString() {
    return `ShiftMode.${this.name}`
  }
}

let modsPressed: boolean = false
let shiftMode = ShiftMode.Off
let shiftButton
let rightShiftButton
let allButtons = []

export default key => Widget.Button({
  label: key.label,
  attribute: { key: key },
  className: `key key-${key.shape}`,
  hexpand: ['space', 'expand'].includes(key.shape),
  setup(self) {
    setupCursorHover(self)

    let pressed = false
    allButtons = allButtons.concat(self)

    if (key.keytype == 'normal') {
      self.connect('pressed', () => Utils.execAsync(`ydotool key ${key.keycode}:1`).catch(print))
      self.connect('clicked', () => {
        Utils.execAsync(`ydotool key ${key.keycode}:0`).catch(print)

        if (shiftMode == ShiftMode.Normal) {
          shiftMode = ShiftMode.Off
          if (typeof shiftButton !== 'undefined') {
            Utils.execAsync('ydotool key 42:0').catch(print)
            shiftButton.toggleClassName('osk-key-active', false)
          }
          if (typeof rightShiftButton !== 'undefined') {
            Utils.execAsync('ydotool key 54:0').catch(print)
            rightShiftButton.toggleClassName('osk-key-active', false)
          }
          allButtons.forEach(button => {
            if (typeof button.attribute.key.labelShift !== 'undefined') 
              button.label = button.attribute.key.label
          })
        }
      })
    } else if (key.keytype == 'modkey') {
      self.connect('pressed', () => { // release
        if (pressed) {
          Utils.execAsync(`ydotool key ${key.keycode}:0`).catch(print)
          self.toggleClassName('osk-key-active', false)
          pressed = false
          if (key.keycode == 100) { // Alt Gr button
            allButtons.forEach(button => { 
              if (typeof button.attribute.key.labelAlt !== 'undefined') 
                button.label = button.attribute.key.label 
            })
          }
        } else {
          Utils.execAsync(`ydotool key ${key.keycode}:1`).catch(print)
          self.toggleClassName('osk-key-active', true)
          if (!(key.keycode == 42 || key.keycode == 54)) 
            pressed = true
          else switch (shiftMode.name) { // This toggles the shift button state
            case 'Off':
              shiftMode = ShiftMode.Normal
              allButtons.forEach(btn => { 
                if (typeof btn.attribute.key.labelShift !== 'undefined') 
                  btn.label = btn.attribute.key.labelShift 
              })
              if (typeof shiftButton !== 'undefined')
                shiftButton.toggleClassName('osk-key-active', true)
              if (typeof rightShiftButton !== 'undefined')
                rightShiftButton.toggleClassName('osk-key-active', true)
              break
            case 'Normal':
              shiftMode = ShiftMode.Locked
              if (typeof shiftButton !== 'undefined') 
                shiftButton.label = key.labelCaps
              if (typeof rightShiftButton !== 'undefined') 
                rightShiftButton.label = key.labelCaps
              break
            case 'Locked':
              shiftMode = ShiftMode.Off;
              if (typeof shiftButton !== 'undefined') {
                shiftButton.label = key.label
                shiftButton.toggleClassName('osk-key-active', false)
              }
              if (typeof rightShiftButton !== 'undefined') {
                rightShiftButton.label = key.label
                rightShiftButton.toggleClassName('osk-key-active', false)
              }
              Utils.execAsync(`ydotool key ${key.keycode}:0`).catch(print)

              allButtons.forEach(btn => { 
                if (typeof btn.attribute.key.labelShift !== 'undefined') 
                  btn.label = btn.attribute.key.label
              })
              break
          }
          
          if (key.keycode == 100) // Alt Gr button
            allButtons.forEach(btn => { 
              if (typeof btn.attribute.key.labelAlt !== 'undefined') 
                btn.label = btn.attribute.key.labelAlt
            })
          modsPressed = true
        }
      })

      if (key.keycode == 42) 
        shiftButton = self
      else if (key.keycode == 54) 
        rightShiftButton = self
    }
  }
})
