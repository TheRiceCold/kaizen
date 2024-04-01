import Sink from './Sink'
import Header from '../Header'
import AppMixer from './AppMixer'
import VolumeSliders from './VolumeSliders'

export default Widget.Box({
  vertical: true,
  className: 'audio-list',
  children: [
    Header('Sound and Audio', [ ]),
    Widget.Box({
      vertical: true,
      children: [ VolumeSliders, Sink, AppMixer ]
    })
  ],
})
