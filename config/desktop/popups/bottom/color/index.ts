import popups from 'service/popups'

import PopupRevealer from '../../PopupRevealer'

import Output from './Output'
import HueSelector from './HueSelector'
import LightnessAndSaturation from './LightnessAndSaturation'

export default PopupRevealer({
  hpack: 'center',
  className: 'color-wheel',
  reveal: popups.bind('color-shown'),
}, HueSelector, LightnessAndSaturation, Output)
