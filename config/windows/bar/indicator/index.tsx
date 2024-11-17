import { Variable, timeout } from 'astal'
import { Gtk } from 'astal/gtk3'

import Wp from 'gi://AstalWp'
import Mpris from 'gi://AstalMpris'
import BrightnessService from 'services/brightness'

import IndicatorStack from './Stack'

export type IndicatorType =
| 'player' | 'cava'
| 'recorder' | 'audio-recorder'
| 'speaker' | 'microphone'
| 'brightness'

let revealCount = 0
const player = Mpris.Player.new('spotify')
const mic = Wp.get_default().defaultMicrophone
const speaker = Wp.get_default().defaultSpeaker
const brightness = BrightnessService.get_default()

const visibleStackChild = Variable<IndicatorType>('player')

function Indicator() {
  const setup = self => self
    .hook(player, 'notify::available', update)
    .hook(mic, 'notify::mute', (self) => {
      visibleStackChild.set('microphone')
      update(self)
    })
    .hook(mic, 'notify::volume', () => {
      visibleStackChild.set('microphone')
      mic.mute = false
      update(self)
    })
    .hook(speaker, 'notify::mute', (self) => {
      visibleStackChild.set('speaker')
      update(self)
    })
    .hook(speaker, 'notify::volume', () => {
      visibleStackChild.set('speaker')
      speaker.mute = false
      update(self)
    })
    .hook(brightness, 'notify::screen', () => {
      visibleStackChild.set('brightness')
      update(self)
    })

  function update(self) {
    self.revealChild = true
    self.toggleClassName('hidden', false)

    revealCount++
    timeout(500, () => {
      revealCount--
      if (revealCount !== 0) return

      if (speaker.mute || speaker.volume <= 0)
        visibleStackChild.set('speaker')
      else if (mic.mute || mic.volume <= 0)
        visibleStackChild.set('microphone')
      else if (player.available)
        visibleStackChild.set('player')
      else {
        self.revealChild = false
        timeout(400, () => self.toggleClassName('hidden', true))
      }
    })
  }

  return (
    <revealer
      setup={setup}
      valign={Gtk.Align.START}
      transitionDuration={250}
      transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      child={<IndicatorStack visibleChild={visibleStackChild} />}
    />
  )
}

export default Indicator
