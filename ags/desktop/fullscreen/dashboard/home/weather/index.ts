import Weather from 'service/api/weather'

import Forecast from './Forecast'
import CurrentCondition from './CurrentCondition'

export default Widget.Box({
  className: 'weather',
  visible: Weather.bind('current_condition').as(c => Object.keys(c).length),
}, CurrentCondition, Forecast)
