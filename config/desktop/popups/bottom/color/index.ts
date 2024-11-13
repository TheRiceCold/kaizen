import popups from 'service/popups'

import PopupRevealer from '../../PopupRevealer'

import Output from './color-output'
import HueSelector from './hue-selector'
import LightnessSaturation from './lightness-saturation'

export default PopupRevealer({
  hpack: 'center',
  className: 'color-popup',
  reveal: popups.bind('color-shown'),
}, HueSelector, LightnessSaturation, Output)
