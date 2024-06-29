import Weather from 'service/api/weather'
import options from 'options'

const CurrentDay = Variable(0)
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const Daily = Widget.Box({
  className: 'forecast',
  children: Weather.bind('daily_forecast').as(
    days => days.map((day, index) => Widget.Button({
      cursor: 'pointer',
      onClicked() {
        CurrentDay.value = index
        Stack.shown = 'hourly'
      },
      child: Widget.Box(
        { vertical: true, vpack: 'center' },
        Widget.Label({ label: weekdays[day.day].substr(0, 3) }),
        Widget.Icon(day.icon),
        Widget.Label(': '+day.windSpeed),
        Widget.Label(` ${day.sunrise}`),
        Widget.Label(` ${day.sunset}`),
        Widget.Label(`min: ${Math.round(day.min)}°`),
        Widget.Label(`max: ${Math.round(day.max)}°`),
      )
    }))
  )
})

/* HACK:
  * IDK why but I f*cking hate adding eventbox everytime a
  * widget to forces itself to show up first in the stack.
*/
const Hourly = Widget.EventBox({ child: Widget.Box(
  { className: 'forecast', vertical: true, hexpand: true },
  Widget.Box(
    { className: 'title' },
    Widget.EventBox({
      cursor: 'pointer',
      child: Widget.Label('Back to Daily Forecast'),
      onPrimaryClick() { Stack.shown = 'daily' }
    }),
    Widget.Label({
      xalign: 1,
      hexpand: true,
      className: 'date',
      label: Utils.merge([
        CurrentDay.bind(),
        Weather.bind('hourly_forecast')
      ], (day, forecast) => `Date: ${forecast[day] ? forecast[day][0].time.slice(0, 10) : ''}`)
    })
  ),
  Widget.Scrollable({
    hexpand: true,
    vscroll: 'never',
    hscroll: 'always',
    child: Widget.Box({
      hpack: 'center',
      children: Utils.merge(
        [ CurrentDay.bind(), Weather.bind('hourly_forecast') ],
        (day, forecast) => forecast[day] ? forecast[day].map(hour => Widget.Button({
          cursor: 'pointer',
          child: Widget.Box(
            { vertical: true },
            Widget.Label(hour.time.slice(11, 16)),
            Widget.Icon(hour.icon),
            Widget.Label(` ${Math.round(hour.temp)}°`),
            Widget.Label(` ${hour.humidity}%`),
            Widget.Label(` ${hour.windSpeed} km/h`),
          )
        })) : [])
    })
  })
) })

const Stack = Widget.Stack({
  transition: 'slide_up_down',
  transitionDuration: options.transition,
  children: { daily: Daily, hourly: Hourly },
})

export default Stack
