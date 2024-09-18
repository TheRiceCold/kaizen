import screenTools from 'service/screen'
import brightness from 'service/brightness'

import Stack from './Stack'
import IconLabel from './IconLabel'

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

    // Prioritization order: Zoom, Pomodoro, Recorder, Player
    if (screenTools._isZoomed)
      reveal('zoom', true)
    else if (screenTools._isRecording)
      reveal('recorder', true)
    else if (player)
      reveal('playing', true)
    else reveal('', false)
  })
}

function indicatorUpdate(type: 'brightness' | 'volume', value: number) {
  const item = stack.children[type]
  item.children = IconLabel(type, value)
  item.hpack = 'center'
  reveal(type, true)
  revealTimeout()
}

const revealer = Widget.Revealer({transition: 'slide_down'}, stack)

export default Widget.Box({
  vpack: 'start',
  child: revealer,
  className: 'indicator',
})
  .hook(mpris, () => revealTimeout(500))
  .hook(screenTools, () => revealTimeout(500))
  .hook(audio.microphone, () => { }) // TODO:
  .hook(brightness, () => indicatorUpdate('brightness', brightness.kbd), 'notify::kbd')
  .hook(brightness, () => indicatorUpdate('brightness', brightness.screen), 'notify::screen')
  .hook(audio.speaker, () => indicatorUpdate('volume', audio.speaker.volume), 'notify::volume')
