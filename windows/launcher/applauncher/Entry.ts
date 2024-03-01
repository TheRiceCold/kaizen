import List from './List'
import icons from 'data/icons'
import options from 'options'
import { launchApp } from 'lib/utils'

const apps = await Service.import('applications')
let first = Variable(apps.query('')).value[0]
const { maxItem } = options.launcher

const Entry = Widget.Entry({
  hexpand: true,
  primaryIconName: icons.ui.search,
  onAccept: () => {
    Entry.text !== '' && launchApp(first)
    App.toggleWindow('launcher')
  },
  onChange: ({ text }) => {
    first = apps.query(text || '')[0]
    List.children.reduce((i, item) => {
      if (!text || i >= maxItem.value) {
        item.reveal_child = false
        return i
      }
      if (item.attribute.app.match(text)) {
        item.reveal_child = true
        return ++i
      }
      item.reveal_child = false
      return i
    }, 0)
  },
})

export default Entry
