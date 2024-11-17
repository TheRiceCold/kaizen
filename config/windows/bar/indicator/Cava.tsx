import { Widget } from 'astal/gtk3'

import Cava from 'gi://AstalCava'

const cava = Cava.get_default()

//cava.connect("notify::values", () => {
//  print(cava.get_values())
//})

export default () => (
  <eventbox name='cava'
    onScroll={(self: Widget.EventBox, ) => {
      //self.parent.visibleChildName = 'player'
    }}
  />
)
