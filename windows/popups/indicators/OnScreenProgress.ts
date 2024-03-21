import Progress from './Progress'

import icons from 'data/icons'
import { icon } from 'lib/utils'
import brightness from 'service/brightness'

const DELAY = 2500
const audio = await Service.import('audio')

export default (vertical: boolean) => {
  const indicator = Widget.Icon({ size: 42, vpack: 'start' })
  const progress = Progress({
    vertical,
    width: vertical ? 42 : 300,
    height: vertical ? 300 : 42,
    child: indicator,
  })

  const revealer = Widget.Revealer({ transition: 'slide_up', child: progress })

  let count = 0
  function show(value: number, icon: string) {
    revealer.revealChild = true
    indicator.icon = icon
    progress.setValue(value)
    count++
    Utils.timeout(DELAY, () => {
      count--

      if (count === 0)
        revealer.revealChild = false
    })
  }

  return revealer
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
}
