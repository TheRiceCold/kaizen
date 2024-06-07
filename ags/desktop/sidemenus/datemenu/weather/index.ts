import Weather from 'service/weather'

import Forecast from './Forecast'

import { capitalize } from 'lib/utils'

const getCurrentCondition = (prefix, item, suffix = '') =>
  Weather.bind('current_condition').as(c => c ? `${prefix} ${c[item]}${suffix}` : '')

const getAstronomy = item => Weather.bind('astronomy').as(
  a => a ? `${capitalize(item)}: ${a[item].replace(/ /g, '')}` : ''
)

const getDescription = condition =>
  condition.weatherDesc ? condition.weatherDesc[0].value : ''

const CurrentCondition = Widget.Box(
  { hexpand: true, className: 'current-condition' },
  Widget.Box({ vertical: true },
    Widget.Label({ className: 'region' }).bind('label', Weather, 'region', r => ' '+r),
    Widget.Box({ hpack: 'center' },
      Widget.Icon().bind('icon', Weather, 'icon'),
      Widget.Label({ label: getCurrentCondition('', 'temp_C', '°') }),
    ),
    Widget.Label({ wrap: true, maxWidthChars: 16, className: 'description' })
      .bind('label', Weather, 'current_condition', getDescription)
      .bind('css', Weather, 'current_condition', condition => {
        const desc = getDescription(condition)
        return desc.length < 16 ? 'font-size: 1.15em;' : 'font-size: 1.25em;'
      })
  ),
  Widget.Box(
    {
      hpack: 'end',
      hexpand: true,
      vertical: true,
      vpack: 'center',
      className: 'details'
    },
    Widget.Label({ label: getCurrentCondition('', 'humidity', '%') }),
    Widget.Label({ label: getCurrentCondition('', 'windspeedKmph', ' km/h') }),
    Widget.Label().bind(
      'label', Weather, 'current_condition',
      c => c ? ` ${c['winddirDegree']}° (${c['winddir16Point']})` : ''
    ),
    Widget.Label({ label: getAstronomy('sunrise') }),
    Widget.Label({ label: getAstronomy('sunset') }),
  ),
)

export default Widget.Box({ vertical: true }, CurrentCondition, Forecast)
