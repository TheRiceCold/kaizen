import { ListStack } from './exports.js'
import { options } from '../../../../constants/main.js'
import Footer from './footer.js'
import Toggles from './toggles/main.js'
import Sliders from './sliders.js'


export default Widget.Box({
  vertical: true,
  className: 'content',
  spacing: options.spacing.value * 2,
  children: [ 
    Toggles, 
    Sliders, 
    ListStack,
    Footer
  ]
})
