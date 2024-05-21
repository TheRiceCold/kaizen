import PopupRevealer from '../PopupRevealer'
import brightness from 'service/brightness'

import options from 'options'
import icons from 'data/icons'
import { icon } from 'lib/utils'
import { showWidget } from 'lib/variables'

const DELAY = 2500
const audio = await Service.import('audio')
let mute = audio.microphone.stream?.is_muted ?? false

let count = 0
function show(value: number, icon: string) {
  revealer.revealChild = true
  Icon.icon = icon
  ProgressBar.value = value < 1 ? value: 1

  count++
  Utils.timeout(DELAY, () => {
    count--

    if (count === 0)
      revealer.revealChild = false
  })
}

const Icon = Widget.Icon()
const ProgressBar = Widget.ProgressBar()

const revealer = PopupRevealer({
  vertical: true,
  hpack: 'center',
  className: 'indicator',
  transition: 'slide_up',
  children: [ Icon, ProgressBar ]
})
.hook(brightness, () => show(
  brightness.screen,
  icons.brightness.screen,
), 'notify::screen')
.hook(brightness, () => show(
  brightness.kbd,
  icons.brightness.keyboard,
), 'notify::kbd')
.hook(audio.speaker, () => show(
  audio.speaker.volume,
  icon(audio.speaker.icon_name || '', icons.audio.type.speaker),
), 'notify::volume')
.hook(audio.microphone, () => Utils.idle(() => {
  if (mute !== audio.microphone.stream?.is_muted) {
    mute = audio.microphone.stream!.is_muted
    icon.icon = icons.audio.mic[mute ? 'muted' : 'high']
    revealer.revealChild = true
    count++

    Utils.timeout(DELAY, () => {
      count--
      if (count === 0)
        revealer.revealChild = false
    })
  }
}))

export default revealer
