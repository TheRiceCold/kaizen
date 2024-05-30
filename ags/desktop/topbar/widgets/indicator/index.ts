import screenTools from 'service/screen'
import brightness from 'service/brightness'

import Stack from './Stack'
import IconLabel from './IconLabel'

import options from 'options'
import { getPlayer } from 'lib/utils'
import { showWidget } from 'lib/variables'

const stack = Stack
const audio = await Service.import('audio')
const mpris = await Service.import('mpris')

let count = 0
function revealTimeout(timeout: number = 1000) {
  const player = getPlayer()

  function reveal(value: boolean) {
    revealer.revealChild = value
    showWidget.indicator.value = value
    revealer.parent.toggleClassName('show-border', value)
  }

  count++
  Utils.timeout(timeout, () => {
    count--
    if (count !== 0) return

    if (screenTools.isRecording) {
      stack.shown = 'recorder'
      reveal(true)
    } else if (player) {
      stack.shown = 'playing'
      reveal(true)
    } else reveal(false)
  })
}

function indicatorUpdate(type, value) {
  const item = stack.children[type]
  item.children = IconLabel(type, value)
  item.hpack = 'center'
  stack.shown = type
  revealTimeout()
}

const revealer = Widget.Revealer({
  child: Widget.Box([ stack ]),
  transition: 'slide_down',
  transitionDuration: options.transition * 1.5,
})
  .hook(mpris, () => revealTimeout(500))
  .hook(screenTools, () => revealTimeout(500))
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
