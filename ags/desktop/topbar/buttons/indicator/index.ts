import screenTools from 'service/screen'
import brightness from 'service/brightness'

import { CircularProgressIcon } from 'widgets'
import ContentRevealer, { type StackChildType } from './ContentRevealer'

import icons from 'data/icons'
import { capitalize } from 'lib/utils'

const { Label } = Widget

let revealCount = 0
const isRevealed = Variable(false)
const currentStackChildName = Variable('volume') // Initial value doesn't really matter bc it's hidden
const contentRevealer = ContentRevealer(isRevealed, currentStackChildName)

const audio = await Service.import('audio')
const mpris = await Service.import('mpris')
const getPlayer = () => mpris.getPlayer('spotify') || null

function update() {
  const player = getPlayer()

  revealCount++
  Utils.timeout(500, () => { // to not hide immediately
    revealCount--
    if (revealCount !== 0) return

    // Prioritization order: Zoom, Pomodoro, Recorder, Player
    isRevealed.value = true
    if (screenTools.isZoomed)
      currentStackChildName.value = 'zoom'
    else if (screenTools.isRecording)
      currentStackChildName.value = 'recorder'
    else if (player)
      currentStackChildName.value = 'playing'
    else
      isRevealed.value = false
  })
}

function indicatorUpdate(type: StackChildType, value: number) {
  const stackChild = contentRevealer.child.children[type]
  const volumeLimit = type === 'volume' && value > 1
  const icon = (type === 'volume') ? icons.audio.type.speaker : (type === 'brightness') ? icons.brightness.indicator : icons.audio.mic.high

  stackChild.children = [
    CircularProgressIcon({
      value: (value < 1) ? value : 1,
      className: `progress ${volumeLimit && 'error'}`,
    }, icon), Label(`${capitalize(type)}: ${Math.round(value * 100)}%`)
  ]

  currentStackChildName.value = type
  isRevealed.value = true
  update()
}

export default contentRevealer
  .hook(mpris, update)
  .hook(screenTools, update)
  .hook(audio.microphone, () => { }) // TODO:
  //.hook(brightness, () => indicatorUpdate('brightness', brightness.kbd), 'notify::kbd')
  .hook(brightness, () => indicatorUpdate('brightness', brightness.screen), 'notify::screen')
  .hook(audio.speaker, () => indicatorUpdate('volume', audio.speaker.volume), 'notify::volume')
