import { ListStack, contents, setCurrentTab } from './imports'
import Footer from './Footer'
// import Sliders from './Sliders.js'
import BigButton from './BigButton'
import options from 'options'

const TabListButtons = Widget.Box({
  vertical: true,
  vpack: 'center',
  spacing: options.theme.spacing.value,
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
  spacing: options.theme.spacing.value * 2,
  children: [
    TabListButtons,
    ListStack,
    // Sliders,
    Footer,
  ]
})
