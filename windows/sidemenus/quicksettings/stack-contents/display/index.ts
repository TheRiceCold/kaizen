import Header from '../Header'
import ThemeList from './ThemeList'
import Brightness from './Brightness'

export default Widget.Box({
  vertical: true,
  className: 'display-options',
  children: [ 
    Header('Display Options'),
    Widget.Box({ 
      vertical: true, 
      children: [ 
        Brightness,
        ThemeList, 
      ]
    })
  ],
})
