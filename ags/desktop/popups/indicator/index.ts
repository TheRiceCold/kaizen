import PopupRevealer from '../PopupRevealer'
import brightness from 'service/brightness'

import icons from 'data/icons'

const DELAY = 1000
const audio = await Service.import('audio')
const hyprland = await Service.import('hyprland')
let mute = audio.microphone.stream?.is_muted ?? false

let count = 0
function show(value: number, icon: string) {
  const activeClient = hyprland.clients.find(c => c.address === hyprland.active.client.address)
  if (!activeClient) return
  if (activeClient.fullscreen && activeClient.fullscreenMode === 0) {
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
  else revealer.revealChild = false
}

const Icon = Widget.Icon()
const ProgressBar = Widget.ProgressBar()

const revealer = PopupRevealer({
  vertical: true,
  hpack: 'center',
  className: 'indicator',
  transition: 'slide_up',
}, Icon, ProgressBar)
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
    icons.audio.type.speaker,
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
