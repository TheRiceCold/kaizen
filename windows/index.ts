import { forMonitors } from 'lib/utils'

import Bar from './bar'
import BarRoundedCorners from './bar/corners'

export default [
  ...forMonitors(Bar),
  ...forMonitors(BarRoundedCorners),
]
