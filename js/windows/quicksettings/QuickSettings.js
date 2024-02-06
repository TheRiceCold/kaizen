import Header from './header/main.js'
import Stack from './stack/main.js'
// import Media from './Media.js'

export default state => Widget.Box({
  vertical: true,
  className: 'quicksettings',
  children: [ 
    Header, 
    Stack(state), 
    // Media()
  ]
})
