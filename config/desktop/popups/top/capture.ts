import popups from 'service/popups'
import capture from 'service/capture'

import { ButtonIconLabel, ButtonLabel, HomoBox } from 'widgets'
import PopupRevealer from '../PopupRevealer'

import icons from 'data/icons'
import { capitalize } from 'lib/utils'

const { Label, Stack } = Widget
const activeContent = Variable<'main' | 'capture' | 'record'>('main')

const RecordButton = (type: 'video' | 'audio', icon: string) =>
  ButtonIconLabel(icon, capitalize(type), () => {
    switch (type) {
      case 'audio':
        capture.audioRecord()
        popups.hide('capture')
        break
      case 'video':
      default:
        capture.capture_type = 'record'
        activeContent.value = 'capture'
        break
    }
  }, {
    sensitive: capture
      .bind(`${type === 'video' ? 'is' : 'audio'}-recording`)
      .as((recording: boolean) => !recording),
    tooltipText: capture
      .bind(`${type === 'video' ? 'is' : 'audio'}-recording`)
      .as((recording: boolean) => recording ? 'Recorder is currently active' : '')
  })

const Content = Stack({
  transition: 'slide_up',
  children: {
    main: HomoBox([
      ButtonIconLabel(icons.ui.camera, 'Shot', () => {
        capture.capture_type = 'screenshot'
        activeContent.value = 'capture'
      }),
      RecordButton('audio', icons.audio.mic.default),
      RecordButton('video', icons.recorder.recording),
    ]),
    capture: HomoBox([
      ButtonLabel('Cancel', () => activeContent.value = 'main'),
      ButtonLabel('Region', () => {
        capture.geometry_type = 'region'
        switch (capture.capture_type) {
          case 'screenshot':
          default:
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
        switch (capture.capture_type) {
          case 'screenshot':
          default:
            capture.screenshot()
            popups.hide('capture')
            activeContent.value = 'main'
            break
          case 'record':
            activeContent.value = 'record'
            break
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
      ]),
    ]),
  },
}).bind('shown', activeContent)

export default PopupRevealer({
  hpack: 'center',
  className: 'capture-popup',
  reveal: popups.bind('capture-shown'),
}, Content)
