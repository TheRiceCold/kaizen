import Weather from 'service/api/weather'

import Forecast from './Forecast'

import options from 'options'
import { capitalize } from 'lib/utils'

const getCurrentCondition = (prefix, item, suffix = '') =>
  Weather.bind('current_condition').as(c => c ? `${prefix} ${c[item]}${suffix}` : '')

const getAstronomy = item => Weather.bind('astronomy').as(
  a => a ? `${capitalize(item)}: ${a[item].replace(/ /g, '')}` : ''
)

const getDescription = condition =>
  condition.weatherDesc ? condition.weatherDesc[0].value : ''

const Stack = Widget.Stack({
  transition: 'slide_up_down',
  className: 'current-condition',
  transitionDuration: options.transition,
  children: {
    main: Widget.Box({ vpack: 'center', vertical: true },
      Widget.Label({ className: 'region' }).bind('label', Weather, 'region', r => ' '+r),
      Widget.Box({ hpack: 'center' },
        Widget.Icon().bind('icon', Weather, 'icon'),
        Widget.Label({ label: getCurrentCondition('', 'temp_C', '°') }),
      ),
      Widget.Label({ wrap: true, maxWidthChars: 16, className: 'description' })
        .bind('label', Weather, 'current_condition', getDescription)
        .bind('css', Weather, 'current_condition', condition => {
          const desc = getDescription(condition)
          return desc.length < 16 ? 'font-size: 1rem;' : 'font-size: 1.15rem;'
        })
    ),
    details: Widget.Box({
      vertical: true,
      vpack: 'center',
      className: 'details',
      children: [
        Widget.Label({ label: getCurrentCondition('', 'humidity', '%') }),
        Widget.Label({ label: getCurrentCondition('', 'windspeedKmph', ' km/h') }),
        Widget.Label().bind(
          'label', Weather, 'current_condition',
          c => c ? ` ${c['winddirDegree']}° (${c['winddir16Point']})` : ''
        ),
        Widget.Label({ label: getAstronomy('sunrise') }),
        Widget.Label({ label: getAstronomy('sunset') }),
      ]
    })
  }
})

const CurrentCondition = Widget.EventBox({
  child: Stack,
  cursor: 'pointer',
  onHover() { Stack.shown = 'details' },
  onHoverLost() { Stack.shown = 'main' },
})

export default Widget.Box({ className: 'weather' }, CurrentCondition, Forecast)
