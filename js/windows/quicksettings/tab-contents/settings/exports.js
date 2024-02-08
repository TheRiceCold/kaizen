import ThemeList from './list-contents/themes/main.js'
import AudioList from './list-contents/audio/main.js'
import NetworkList from './list-contents/network/main.js'
import BluetoothList from './list-contents/bluetooth/main.js'
import NotificationList from './list-contents/notifications/main.js'

let currentTabId = 3 // default tab: Notifications
const contents = [
  NetworkList, BluetoothList, AudioList,
  NotificationList, ThemeList,
]

const ListStack = Widget.Stack({
  transition: 'slide_up_down',
  children: contents.reduce((acc, item) => {
    acc[item.name] = item.list
    return acc
  }, {})
})

export {
  ListStack,
  contents,
  currentTabId,
}
