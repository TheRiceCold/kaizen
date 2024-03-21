import options from 'options'
import MicMute from './MicMute'
import OnScreenProgress from './OnScreenProgress'

const { progress, microphone } = options.indicators

export default Widget.Box({
  expand: true,
  css: 'padding: 2px;',
  className: 'indicators',
  child: Widget.Overlay(
    { child: Widget.Box({ expand: true }) },
    Widget.Box({
      hpack: progress.pack.h.bind(),
      vpack: progress.pack.v.bind(),
      child: progress.vertical.bind().as(OnScreenProgress),
    }),
    Widget.Box({
      child: MicMute(),
      hpack: microphone.pack.h.bind(),
      vpack: microphone.pack.v.bind(),
    }),
  ),
})
