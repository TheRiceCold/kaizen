import Weather from 'service/api/weather'

const Region = Widget.Label({ className: 'region' }).bind('label', Weather, 'region')

function Description() {
  const getDescription = condition => condition.weatherDesc
    ? condition.weatherDesc[0].value : ''

  return Widget.Label({
    wrap: true,
    maxWidthChars: 20,
    justification: 'center',
    className: 'description',
    css: Weather.bind('current_condition').as(
      c => (getDescription(c).length > 20)
        ? 'font-size: 1.25rem;' : 'font-size: 1.5rem;'
    ),
    label: Weather.bind('current_condition').as(getDescription),
  })
}

const IconAndTemp = Widget.Box(
  { hpack: 'center' },
  Widget.Icon().bind('icon', Weather, 'icon'),
  Widget.Label().bind('label', Weather, 'current_condition', c => c['temp_C']+'°C'),
)

const Sun = Widget.Box({ hpack: 'center' },
  Widget.Label({
    tooltipText: 'Sunrise',
    label: Weather.bind('astronomy').as(a => ` ${a['sunrise']}`),
  }),
  Widget.Separator({vertical: true}),
  Widget.Label({
    tooltipText: 'Sunset',
    label: Weather.bind('astronomy').as(a => ` ${a['sunset']}`),
  })
)

const Air = Widget.Box([
  Widget.Label({
    tooltipText: 'Humidity',
    label: Weather.bind('current_condition').as(c => ` ${c['humidity']}%`)
  }),
  Widget.Separator({vertical: true}),
  Widget.Label({
    tooltipText: 'Wind Speed',
    label: Weather.bind('current_condition').as(c => ` ${c['windspeedKmph']} km/h`)
  }),
  Widget.Separator({vertical: true}),
  Widget.Label({
    tooltipText: 'Wind Direction',
    label: Weather.bind('current_condition').as(c => ` ${c['winddirDegree']}° (${c['winddir16Point']})`)
  }),
])

const Details = Widget.Box({
  vpack: 'end',
  vertical: true,
  className: 'details',
  children: [Sun, Air],
})

export default Widget.Box({
  vertical: true,
  hpack: 'center',
  homogeneous: true,
  className: 'current-condition',
  children: [Region, IconAndTemp, Description(), Details]
})
