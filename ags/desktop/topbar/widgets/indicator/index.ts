import brightness from 'service/brightness'

import Stack from './Stack'

import options from 'options'
import icons from 'data/icons'
import { capitalize, getPlayer } from 'lib/utils'

const stack = Stack
const audio = await Service.import('audio')
const mpris = await Service.import('mpris')
const showBorder = show => revealer.parent.toggleClassName('show-border', show)

let count = 0
function revealTimeout(timeout: number = 1000) {
  showBorder(true)
  const player = getPlayer()
  revealer.revealChild = true

  count++
  Utils.timeout(timeout, () => {
    count--
    if (count !== 0) return

    if (player)
      stack.shown = 'playing'
    else {
      revealer.revealChild = false
      showBorder(false)
    }
  })
}

function playerUpdate() {
  const player = getPlayer()
  if (!player) { revealTimeout(500); return }

  if (player['play-back-status'] !== 'Playing')
    stack.shown = 'playing'
  revealTimeout(500)
}

function indicatorUpdate(
  type: 'brightness' | 'volume' | 'microphone',
  value: number,
) {
  stack.shown = type
  revealer.revealChild = true

  stack.children[type].children = [
    Widget.CircularProgress({
      startAt: 0.75,
      className: 'progress',
      value: (value < 1) ? value : 1,
      child: Widget.Icon(
        (type === 'volume') ? icons.audio.type.speaker :
          (type === 'brightness') ? icons.brightness.indicator :
            icons.audio.mic.high)
    }),
    Widget.Label(`${capitalize(type)}: ${Math.round(value * 100)}%`),
  ]
  revealTimeout()
}

const revealer = Widget.Revealer({
  child: Widget.Box([ stack ]),
  transition: 'slide_down',
  transitionDuration: options.transition * 1.5,
})
  .hook(mpris, playerUpdate)
  .hook(audio.microphone, () => { })
  .hook(brightness, () => indicatorUpdate('brightness', brightness.kbd), 'notify::kbd')
  .hook(brightness, () => indicatorUpdate('brightness', brightness.screen), 'notify::screen')
  .hook(audio.speaker, () => indicatorUpdate('volume', audio.speaker.volume), 'notify::volume')

export default Widget.Box({
  vpack: 'start',
  child: revealer,
  cursor: 'pointer',
  className: 'indicator',
})
