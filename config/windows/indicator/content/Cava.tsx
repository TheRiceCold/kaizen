import { Gdk } from 'astal/gtk3'

import Cava from 'gi://AstalCava'

const cava = Cava.get_default()

//cava.connect("notify::values", () => {
//  print(cava.get_values())
//})

export default () => (
  <eventbox name='cava'
    onScroll={(self, event) => {
      if (event.direction === Gdk.ScrollDirection.UP)
        self.parent.visibleChildName = 'player'
    }}
  />
)
