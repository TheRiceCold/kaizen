import popups from 'service/popups'
import capture from 'service/capture'

import { ButtonLabel, HomoBox } from 'widgets'
import PopupRevealer from '../PopupRevealer'

const { Label, Stack } = Widget
const activeContent = Variable<'main' | 'capture' | 'record'>('main')

const Content = Stack({
  transition: 'slide_up',
  children: {
    main: HomoBox([
      ButtonLabel('󰆟 Shot', () => {
        capture.capture_type = 'screenshot'
        activeContent.value = 'capture'
      }),
      ButtonLabel(' Audio', () => {
        capture.audioRecord()
        popups.hide('capture')
      }),
      ButtonLabel(' Record', () => {
        capture.capture_type = 'record'
        activeContent.value = 'capture'
      }),
    ]),
    capture: HomoBox([
      ButtonLabel('Cancel', () => activeContent.value = 'main'),
      ButtonLabel('Region', () => {
        capture.geometry_type = 'region'
        switch(capture.capture_type) {
          case 'screenshot': default:
            capture.screenshot()
            popups.hide('capture')
            activeContent.value = 'main'
            break
          case 'record':
            activeContent.value = 'record'
            break
        }
      }),
      ButtonLabel('Fullscreen', () => {
        capture.geometry_type = 'fullscreen'
        switch(capture.capture_type) {
          case 'screenshot': default:
            capture.screenshot()
            popups.hide('capture')
            activeContent.value = 'main'
            break
          case 'record': activeContent.value = 'record'; break
        }
      }),
    ]),
    record: Widget.Box([
      Label('Enable audio?'),
      HomoBox([
        ButtonLabel('Yes', () => {
          capture.audio_enabled = true
          capture.record()
          popups.hide('capture')
          activeContent.value = 'main'
        }),
        ButtonLabel('No', () => {
          capture.audio_enabled = false
          capture.record()
          popups.hide('capture')
          activeContent.value = 'main'
        }),
        ButtonLabel('Cancel', () => {
          activeContent.value = 'capture'
        }),
      ])
    ])
  }
}).bind('shown', activeContent)

export default PopupRevealer({
  hpack: 'center',
  className: 'capture-popup',
  reveal: popups.bind('capture-shown'),
}, Content)
