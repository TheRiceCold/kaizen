import Weather from 'service/api/weather'

const Region = Widget.Label({ className: 'region' }).bind('label', Weather, 'region', r => ' '+r)

function Description() {
  const getDescription = condition => condition.weatherDesc ? condition.weatherDesc[0].value : ''

  return Widget.Label({
    wrap: true,
    maxWidthChars: 24,
    className: 'description',
    label: Weather.bind('current_condition').as(getDescription),
    css: Weather.bind('current_condition').as(condition => {
      const description = getDescription(condition)
      return description.length < 24 ? 'font-size: 1.5rem;' : 'font-size: 1.75rem;'
    })
  })
}

const IconAndTemp = Widget.Box(
  { hpack: 'center' },
  Widget.Icon().bind('icon', Weather, 'icon'),
  Widget.Label().bind('label', Weather, 'current_condition', c => c['temp_C']+'°C'),
)

const Sun = Widget.Box(
  { className: 'sun', hpack: 'center' },
  Widget.Label({
    tooltipText: 'Sunrise',
    label: Weather.bind('astronomy').as(a => ` ${a['sunrise']} |`),
  }),
  Widget.Label({
    tooltipText: 'Sunset',
    label: Weather.bind('astronomy').as(a => ` ${a['sunset']}`),
  })
)

const Details = Widget.Box([
  Widget.Label({
    tooltipText: 'Humidity',
    label: Weather.bind('current_condition').as(c => ` ${c['humidity']}% |`)
  }),
  Widget.Label({
    tooltipText: 'Wind Speed',
    label: Weather.bind('current_condition').as(c => ` ${c['windspeedKmph']} km/h |`)
  }),
  Widget.Label({
    tooltipText: 'Wind Direction',
    label: Weather.bind('current_condition').as(c => ` ${c['winddirDegree']}° (${c['winddir16Point']})`)
  }),
])

export default Widget.Box({
  vertical: true,
  className: 'current-condition',
  children: [Region, IconAndTemp, Description(), Sun, Details]
})
