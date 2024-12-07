import { App, Astal, Gdk } from 'astal/gtk3'

import Indicator from './indicator'
import LeftButtons from './LeftButtons'
import RightButtons from './RightButtons'

const Bar = (gdkmonitor: Gdk.Monitor) => (
  <window
    className='bar'
    application={App}
    gdkmonitor={gdkmonitor}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    anchor={
      Astal.WindowAnchor.TOP |
      Astal.WindowAnchor.LEFT |
      Astal.WindowAnchor.RIGHT
    } >
    <centerbox>
      <LeftButtons />
      <Indicator />
      <RightButtons />
    </centerbox>
  </window>
)

export default Bar
