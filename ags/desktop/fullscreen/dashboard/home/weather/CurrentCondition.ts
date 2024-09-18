import Weather from 'service/api/weather'

const getDescription = c => c.weatherDesc ? c.weatherDesc[0].value : ''
const CurrentConditionLabel = (
  cb: (c) => string,
  props: typeof Widget.Label = {},
) => Widget.Label(props).bind('label', Weather, 'current_condition', cb)

export default Widget.Box({
  vertical: true,
  hpack: 'center',
  homogeneous: true,
  className: 'current-condition',
},

// Region
Widget.Label({ className: 'region' }).bind('label', Weather, 'region'),

// Temperature and Icon
Widget.Box(
  { hpack: 'center' },
  Widget.Icon().bind('icon', Weather, 'icon'),
  CurrentConditionLabel(c => `${c['temp_C']}°C`),
),

// Description
CurrentConditionLabel(getDescription, {
  wrap: true,
  maxWidthChars: 20,
  justification: 'center',
  className: 'description',
  css: Weather.bind('current_condition')
    .as(c => `font-size: ${getDescription(c).length > 20 ? 1.15 : 1.25}rem;`)
}),

// Details
Widget.Box(
  { vpack: 'end', vertical: true, className: 'details' },
  // Sunris and Sunset
  Widget.Box({ hpack: 'center' },
    Widget.Label({ tooltipText: 'Sunrise' })
      .bind('label', Weather, 'astronomy', a => ` ${a.sunrise}`),
    Widget.Separator({ vertical: true }),
    Widget.Label({ tooltipText: 'Sunset' })
      .bind('label', Weather, 'astronomy', a => ` ${a.sunset}`),
  ),
  // Air and Wind Conditions
  Widget.Box([
    CurrentConditionLabel(
      c => ` ${c.humidity}%`,
      { tooltipText: 'humidity' }
    ), Widget.Separator({ vertical: true }),
    CurrentConditionLabel(
      c => ` ${c.windspeedKmph} km/h`,
      { tooltipText: 'Wind Speed' }
    ), Widget.Separator({ vertical: true }),
    CurrentConditionLabel(
      c => ` ${c.winddirDegree}° (${c.winddir16Point})`,
      { tooltipText: 'Wind Direction' }
    )
  ])
))
