import { App, Astal, Gdk } from 'astal/gtk3'

import Indicator from './indicator'
import LeftButtons from './LeftButtons'
import RightButtons from './RightButtons'

const Bar = (gdkmonitor: Gdk.Monitor) => (
  <window
    className='bar'
    gdkmonitor={gdkmonitor}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
    application={App}>
    <centerbox>
      <LeftButtons />
      <Indicator />
      <RightButtons />
    </centerbox>
  </window>
)

export default Bar
