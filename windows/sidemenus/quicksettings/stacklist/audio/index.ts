import Header from '../Header'

import AppMixer from './AppMixer'
import SinkSelector from './SinkSelector'
import VolumeSliders from './VolumeSliders'

export default Widget.Box({
  vertical: true,
  className: 'audio-list',
  children: [
    Header('Volume', []),
    Widget.Box({
      vertical: true,
      children: [ VolumeSliders, AppMixer, SinkSelector ]
    })
  ],
})
