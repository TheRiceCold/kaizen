import Weather from 'service/api/weather'
import ForecastStack from './Forecast'
import { VBox } from 'widgets'

const { Box, Button, Icon, Label } = Widget
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default currentDay => Box({ className: 'daily' })
  .bind('children', Weather, 'daily_forecast', days => days.map(
    (day, index) => Button({
      cursor: 'pointer',
      onClicked() {
        currentDay.value = index
        ForecastStack.shown = 'hourly'
      },
    }, VBox({ vpack: 'center' },
      Label({ className: 'day', label: weekdays[day.day].substring(0, 3) }),
      Icon({ icon: day.icon, tooltipText: day.description }),
      Label(`min: ${Math.round(day.min)}°`),
      Label(`max: ${Math.round(day.max)}°`),
      Label({ tooltipText: 'Sunrise', label: ` ${day.sunrise} AM` }),
      Label({ tooltipText: 'Sunset', label: ` ${day.sunset} PM` }),
      Label({ tooltipText: 'Wind Speed', label: `: ${day.windSpeed} km/h` }),
    ))))
