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

function reveal(show: string, value: boolean) {
  if (show) stack.shown = show
  revealer.revealChild = value
  showWidget.indicator.value = value
  revealer.parent.toggleClassName('show-border', value)
}

let count = 0
function revealTimeout(timeout: number = 1000) {
  const player = getPlayer()

  count++
  Utils.timeout(timeout, () => {
    count--
    if (count !== 0) return

    if (screenTools.isRecording)
      reveal('recorder', true)
    else if (player)
      reveal('playing', true)
    else reveal('', false)
  })
}

function indicatorUpdate(type, value) {
  const item = stack.children[type]
  item.children = IconLabel(type, value)
  item.hpack = 'center'
  reveal(type, true)
  revealTimeout()
}

const revealer = Widget.Revealer({
  transition: 'slide_down',
  transitionDuration: options.transition * 1.5,
  child: Widget.Box([
    Widget.Separator({ vertical: true }),
    stack,
    Widget.Separator({ vertical: true }),
  ]),
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
