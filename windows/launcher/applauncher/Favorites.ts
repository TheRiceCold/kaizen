import Entry from './Entry'
import AppItem from './AppItem'

import options from 'options'

const { favorites } = options.launcher
const apps = await Service.import('applications')

export default Widget.Revealer({
  visible: favorites.bind().as(f => f.length > 0),
  child: Widget.Box({
    vertical: true,
    className: 'quicklaunch',
    children: favorites.bind().as(f =>
      f.map(f => apps.query(f)?.[0])
      .filter(f => f)
      .map(AppItem),
    ),
  }),
  setup: self => self.hook(Entry, () => self.reveal_child = !Entry.text, 'notify::text'),
})
