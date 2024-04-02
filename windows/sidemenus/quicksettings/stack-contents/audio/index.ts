import Header from '../Header'

import AppMixer from './AppMixer'
import SinkSelector from './SinkSelector'
import VolumeSliders from './VolumeSliders'

import { sh } from 'lib/utils'
import { setupCursorHover } from 'misc/cursorhover'

export default Widget.Box({
  vertical: true,
  className: 'audio-list',
  children: [
    Header('Volume', [ 
      Widget.Button({
        label: 'Settings',
        setup: setupCursorHover,
        onClicked: () => sh('pavucontrol')
      }) 
    ]),
    Widget.Box({
      vertical: true,
      children: [ VolumeSliders, AppMixer, SinkSelector ]
    })
  ],
})
