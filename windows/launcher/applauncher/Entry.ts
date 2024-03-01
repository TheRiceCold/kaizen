import List from './List'
import options from 'options'
import icons from 'data/icons'
import { launchApp } from 'lib/utils'

const { maxItem } = options.launcher
const apps = await Service.import('applications')
let first = Variable(apps.query('')).value[0]

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
        item.revealChild = false
        return i
      }
      if (item.attribute.app.match(text)) {
        item.revealChild = true
        return ++i
      }
      item.revealChild = false
      return i
    }, 0)
  }
})

export default Entry
