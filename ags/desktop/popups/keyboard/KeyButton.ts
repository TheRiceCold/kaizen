import { sh } from 'lib/utils'
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

let shiftMode = ShiftMode.Off
let shiftButton
let rightShiftButton
let buttons = []

function normalKeyExec(self, buttons, key) {
  self.connect('pressed', () => sh(`ydotool key ${key.code}:1`).catch(print))
  self.connect('clicked', () => {
    sh(`ydotool key ${key.code}:0`).catch(print)

    if (shiftMode == ShiftMode.Normal) {
      shiftMode = ShiftMode.Off
      if (typeof shiftButton !== 'undefined') {
        sh('ydotool key 42:0').catch(print)
        shiftButton.toggleClassName('key-active', false)
      }
      if (typeof rightShiftButton !== 'undefined') {
        sh('ydotool key 54:0').catch(print)
        rightShiftButton.toggleClassName('key-active', false)
      }
      buttons.forEach(btn => {
        if (typeof btn.attribute.key.labelShift !== 'undefined')
          btn.label = btn.attribute.key.label
      })
    }
  })
}

function modKeyExec(self, buttons, key) {
  let pressed = false

  self.connect('pressed', () => { // release
    if (pressed) {
      sh(`ydotool key ${key.code}:0`).catch(print)
      self.toggleClassName('key-active', false)
      pressed = false
      if (key.code == 100) { // Alt Gr button
        buttons.forEach(btn => {
          if (typeof btn.attribute.key.labelAlt !== 'undefined')
            btn.label = btn.attribute.key.label
        })
      }
    } else {
      sh(`ydotool key ${key.code}:1`).catch(print)
      self.toggleClassName('key-active', true)
      if (!(key.code == 42 || key.code == 54))
        pressed = true
      else switch (shiftMode.name) { // This toggles the shift button state
        case 'Off':
          shiftMode = ShiftMode.Normal
          buttons.forEach(btn => {
            if (typeof btn.attribute.key.labelShift !== 'undefined')
              btn.label = btn.attribute.key.labelShift
          })
          if (typeof shiftButton !== 'undefined')
            shiftButton.toggleClassName('key-active', true)
          if (typeof rightShiftButton !== 'undefined')
            rightShiftButton.toggleClassName('key-active', true)
          break
        case 'Normal':
          shiftMode = ShiftMode.Locked
          if (typeof shiftButton !== 'undefined')
            shiftButton.label = key.labelCaps
          if (typeof rightShiftButton !== 'undefined')
            rightShiftButton.label = key.labelCaps
          break
        case 'Locked':
          shiftMode = ShiftMode.Off
          if (typeof shiftButton !== 'undefined') {
            shiftButton.label = key.label
            shiftButton.toggleClassName('key-active', false)
          }
          if (typeof rightShiftButton !== 'undefined') {
            rightShiftButton.label = key.label
            rightShiftButton.toggleClassName('key-active', false)
          }
          sh(`ydotool key ${key.code}:0`).catch(print)

          buttons.forEach(btn => {
            if (typeof btn.attribute.key.labelShift !== 'undefined')
              btn.label = btn.attribute.key.label
          })
          break
      }

      if (key.code == 100) // Alt Gr button
        buttons.forEach(btn => {
          if (typeof btn.attribute.key.labelAlt !== 'undefined')
            btn.label = btn.attribute.key.labelAlt
        })
      modsPressed = true
    }
  })

  if (key.code == 42)
    shiftButton = self
  else if (key.code == 54)
    rightShiftButton = self
}

export default key => Widget.Button({
  label: key.label,
  attribute: { key: key },
  className: `key key-${key.shape}`,
  hexpand: ['space', 'expand'].includes(key.shape),
  setup(self) {
    setupCursorHover(self)
    buttons = buttons.concat(self)

    switch(key.type) {
      case 'normal':
        normalKeyExec(self, buttons, key)
        break
      case 'modkey':
        modKeyExec(self, buttons, key)
        break
    }
  }
})
