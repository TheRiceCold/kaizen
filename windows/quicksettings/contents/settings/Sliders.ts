import {
  Brightness,
  Volume,
  Microphone,
  AppMixer,
  SinkSelector,
} from './widgets'
import Row from './Row'

export default Widget.Box({
  vertical: true,
  children: [
    Row(
      [ Volume ],
      [ SinkSelector, AppMixer ]
    ),
    Microphone(),
    Brightness(),
  ],
})
