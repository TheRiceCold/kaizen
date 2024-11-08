import popups from 'service/popups'

import { ButtonLabel, HomoBox } from 'widgets'
import PopupRevealer from '../../PopupRevealer'
import screen from 'service/screen'

const { Label, Stack } = Widget
const activeContent = Variable<'main' | 'capture' | 'record'>('main')

const Content = Stack({
  transition: 'slide_up',
  children: {
    main: HomoBox([
      ButtonLabel(' Audio', () => { }),
      ButtonLabel(' Record', () => {
        screen.capture_type = 'record'
        activeContent.value = 'capture'
      }),
      ButtonLabel('󰆟 Screenshot', () => {
        screen.capture_type = 'screenshot'
        activeContent.value = 'capture'
      })
    ]),
    capture: HomoBox([
      ButtonLabel('Cancel', () => activeContent.value = 'main'),
      ButtonLabel('Region', () => {
        screen.geometry_type = 'region'
        switch(screen.capture_type) {
          case 'screenshot': default:
            screen.shot();
            popups.hide('capture')
            activeContent.value = 'main'
            break
          case 'record':
            activeContent.value = 'record'
            break
        }
      }),
      ButtonLabel('Fullscreen', () => {
        screen.geometry_type = 'fullscreen'
        switch(screen.capture_type) {
          case 'screenshot': default:
            screen.shot()
            popups.hide('capture')
            activeContent.value = 'main'
            break
          case 'record': activeContent.value = 'record'; break
        }
      }),
    ]),
    record: HomoBox([
      Label('Enable audio?'),
      ButtonLabel('Yes', () => {
        screen.audio_enabled = true
        screen.record()
        popups.hide('capture')
        activeContent.value = 'main'
      }),
      ButtonLabel('No', () => {
        screen.audio_enabled = false
        screen.record()
        popups.hide('capture')
        activeContent.value = 'main'
      }),
      ButtonLabel('Cancel', () => {
        activeContent.value = 'capture'
      }),
    ])
  }
}).bind('shown', activeContent)

export default PopupRevealer({
  hpack: 'center',
  className: 'capture-popup',
  reveal: popups.bind('capture-shown'),
}, Content)
