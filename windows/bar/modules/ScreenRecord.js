import { Widget } from '../../../imports.js'
// import { FontIcon } from '../../../misc/main.js'
import { ScreenRecorder } from '../../../services/main.js'
import PanelButton from './PanelButton.js'
import icons from '../../../icons.js'

export default () => PanelButton({
  class_name: 'recorder',
  onClicked: () => ScreenRecorder.stop(),
  binds: [['visible', ScreenRecorder, 'recording']],
  content: Widget.Box({
    children: [
      Widget.Icon(icons.recorder.recording),
      Widget.Label({
        binds: [['label', ScreenRecorder, 'timer', time => {
          const sec = time % 60;
          const min = Math.floor(time / 60);
          return `${min}:${sec < 10 ? '0' + sec : sec}`
        }]],
      }),
    ],
  }),
})
