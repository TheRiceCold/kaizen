import { timeout, Variable } from 'astal'
import { App, Astal, Gtk } from 'astal/gtk3'
import { WindowProps } from 'astal/gtk3/widget'

import Wp from 'gi://AstalWp'
import Mpris from 'gi://AstalMpris'
import BrightnessService from 'services/brightness'

import options from 'options'
import IndicatorStack from './Stack'

export type IndicatorType =
| 'brightness'
| 'speaker' | 'microphone'
| 'player' | 'cava'
| 'recorder' | 'audio-recorder'
| null

let revealCount = 0
const player = Mpris.Player.new(options.indicator.preferredPlayer.get())
const mic = Wp.get_default().defaultMicrophone
const speaker = Wp.get_default().defaultSpeaker
const brightness = BrightnessService.get_default()

const isRevealed = Variable(false)
const { timeoutDuration } = options.indicator
const visibleStackChild = Variable<IndicatorType>(null)

export default() => {
  function update(self: WindowProps) {
    isRevealed.set(true)
    self.toggleClassName('hidden', false)

    revealCount++
    timeout(timeoutDuration.get(), () => {
      revealCount--
      if (revealCount !== 0) return

      if (speaker.mute || speaker.volume <= 0)
        visibleStackChild.set('speaker')
      else if (mic.mute || mic.volume <= 0)
        visibleStackChild.set('microphone')
      else if (player.available)
        visibleStackChild.set('player')
      else {
        isRevealed.set(false)
        timeout(timeoutDuration.get() - 100, () => {
          self.toggleClassName('hidden', true)
          self.visible = false
        })
      }
    })
  }

  function setup(self: WindowProps) {
    function callback(indicatorName: IndicatorType) {
      visibleStackChild.set(indicatorName)
      update(self)
    }

    self
      .hook(player, 'notify::available', update)
      .hook(mic, 'notify::mute', () => callback('microphone'))
      .hook(mic, 'notify::volume', () => { mic.mute = false; callback('microphone') })
      .hook(speaker, 'notify::mute', () => callback('speaker'))
      .hook(speaker, 'notify::mute', () => {
        speaker.mute = speaker.volume <= 0
        callback('speaker')
      })
      .hook(brightness, 'notify::screen', () => callback('brightness'))
  }

  return (
    <window
      setup={setup}
    	visible={false}
      name='indicator'
    	application={App}
      className='indicator'
    	layer={Astal.Layer.TOP}
    	exclusive={Astal.Layer.IGNORE}
    	anchor={Astal.WindowAnchor.TOP}
    >
      <revealer
        valign={Gtk.Align.START}
        revealChild={isRevealed()}
        transitionDuration={options.transition()}
        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
        child={<IndicatorStack visibleChild={visibleStackChild}/>}
      />
    </window>
  )
}
