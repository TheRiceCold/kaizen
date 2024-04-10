import PopupRevealer from '../PopupRevealer'

import Output from './Output'
import HueSelector from './HueSelector'
import LightnessAndSaturation from './LightnessAndSaturation'

import options from 'options'
import { showWidget } from 'lib/variables'

export default PopupRevealer({
  hpack: 'center',
  className: 'color-wheel',
  reveal: showWidget.color.bind(),
  spacing: options.theme.spacing * 1.5,
  children: [ HueSelector, LightnessAndSaturation, Output ],
})
