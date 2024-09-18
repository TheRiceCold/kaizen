import Weather from 'service/api/weather'

import Forecast from './Forecast'
import CurrentCondition from './CurrentCondition'

export default Widget.Box({className: 'weather'}, CurrentCondition, Forecast)
  .bind('visible', Weather, 'current_condition', c => Object.keys(c).length)
