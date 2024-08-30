import { create } from 'lib/option'

import theme from './theme'
import widgets from './widgets'
import windows from './windows'

export default create(OPTIONS, {
  ...theme,
  ...widgets,
  ...windows,
})
