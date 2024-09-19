import { ButtonLabel, VBox } from 'widgets'
import Header from '../Header'

import AppMixer from './AppMixer'
import SinkSelector from './SinkSelector'
import VolumeSliders from './VolumeSliders'

import { sh } from 'lib/utils'

export default VBox(
  { className: 'audio-list' },
  Header('Volume', [
    ButtonLabel('Equalizer', () => sh('easyeffects')),
    ButtonLabel('Settings', () => sh('pavucontrol')),
  ]),
  VBox([ VolumeSliders, AppMixer, SinkSelector ])
)
