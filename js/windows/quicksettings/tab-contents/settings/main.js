import { ListStack, contents, currentTabId } from './exports.js'
import { options } from '../../../../constants/main.js'
import Footer from './Footer.js'
import Sliders from './Sliders.js'
import BigButton from './BigButton.js'

const TabListButtons = Widget.Box({
  vertical: true,
  vpack: 'center',
  spacing: options.spacing.value,
  children: [
    Widget.Box({ 
      hpack: 'center',
      spacing: options.padding.value,
      children: contents.map(
        (item, id) => BigButton({ 
          onClicked: () => {
            ListStack.shown = contents[id].name
            currentTabId = id
          }, ...item 
        }))
    }),
  ]
})


export default Widget.Box({
  vertical: true,
  className: 'content',
  spacing: options.spacing.value * 2,
  children: [ 
    TabListButtons, 
    ListStack,
    Sliders, 
    Footer,
  ]
})
