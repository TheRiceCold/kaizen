import { options } from '../../../../../../constants/main.js'
import Header from '../header.js'
import AppMixer from './Mixer.js'
import SinkSelector from './SinkSelector.js'
import Volume from './Volume.js'

const Content = Widget.Box({
  vertical: true,
  spacing: options.spacing.value,
  children: [
    Widget.Box({
      vertical: true,
      children: [ Volume('sink'), Volume('source') ]
    }),
    SinkSelector('sink'),
    SinkSelector('source'),
    AppMixer,
  ]
})

export default {
  icon: '',
  name: 'audio',
  list: Widget.Box({
    vexpand: true,
    vertical: true,
    children: [ Header('Audio'), Content ],
    className: 'notification-list spacing-v-5',
  })
}
