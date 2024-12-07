import { Gdk } from 'astal/gtk3'
import { EventBoxProps } from 'astal/gtk3/widget'

import Cava from 'gi://AstalCava'

const cava = Cava.get_default()

//cava.connect("notify::values", () => {
//  print(cava.get_values())
//})

export default () => (
  <eventbox name='cava'
    onScroll={(self: EventBoxProps, event: Gdk.Event) => {
      if (event.direction === Gdk.ScrollDirection.UP)
        self.parent.visibleChildName = 'player'
    }}
  />
)
