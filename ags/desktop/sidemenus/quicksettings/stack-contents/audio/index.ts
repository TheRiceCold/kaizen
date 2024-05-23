import Header from '../Header'

import AppMixer from './AppMixer'
import SinkSelector from './SinkSelector'
import VolumeSliders from './VolumeSliders'

import { sh } from 'lib/utils'

const buttons = [
  { label: 'Equalizer', exec: 'easyeffects' },
  { label: 'Settings', exec: 'pavucontrol' },
]

export default Widget.Box(
  { vertical: true, className: 'audio-list' },
  Header('Volume', buttons.map(({ label, exec }) =>
    Widget.Button({
      label,
      cursor: 'pointer',
      onClicked() { sh(exec) }
    })
  )),
  Widget.Box({ vertical: true, }, VolumeSliders, AppMixer, SinkSelector)
)
