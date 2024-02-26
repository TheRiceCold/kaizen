import { ListStack, contents, setCurrentTab } from './imports'
import BigButton from './BigButton'
import Sliders from './sliders'
import options from 'options'

const TabListButtons = Widget.Box({
  vertical: true,
  vpack: 'center',
  children: [
    Widget.Box({
      hpack: 'center',
      spacing: options.theme.padding.value,
      children: contents.map(
        (item, id) => BigButton({
          onClicked: () => {
            ListStack.shown = contents[id].name
            setCurrentTab(id)
          }, ...item
        }))
    }),
  ]
})

export default Widget.Box({
  vertical: true,
  className: 'content',
  children: [
    TabListButtons,
    ListStack,
    Sliders,
  ]
})
