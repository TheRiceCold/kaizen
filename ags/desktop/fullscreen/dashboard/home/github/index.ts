import options from 'options'
import { sh } from 'lib/utils'
import { VBox } from 'widgets'

const { Gtk } = imports.gi

const data = Variable({})
let stopDrawingTwice = false
const Grid = Widget.subclass(Gtk.Grid)

const user = options.dashboard.githubUser
const url = 'https://github-contributions-api.jogruber.de/v4/'
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

sh(`curl ${url + user.value}`).then(x => {
  const out = JSON.parse(x)

  const daysSoFar = Number(Utils.exec('date +%j'))
  data.value = {
    total: out.total,
    contributions: out.contributions.slice(daysSoFar - 180)
  }
}).catch(logError)

function ContribBox({ count, date, level = 0 }) {
  const dateValue = new Date(date)
  const month = months[dateValue.getMonth()]
  const tooltipText = `${count} contributions on ${month} ${date.substr(8, 10)}`

  return Widget.DrawingArea({
    tooltipText,
    classNames: ['contrib-box', 'github-level-' + level],
    setup(self) {
      const styles = self.get_style_context()
      const fg = styles.get_background_color(Gtk.StateFlags.NORMAL)

      self.set_size_request(16, 16)

      self.connect('draw', (_, cr) => {
        cr.setSourceRGBA(fg.red, fg.green, fg.blue, fg.alpha)
        cr.rectangle(0, 0, 16, 16)
        cr.fill()
      })
    }
  })
}

export default VBox({ className: 'github', visible: data.bind() })
  .hook(data, (self: typeof Widget.Box) => {
    if (!stopDrawingTwice) { stopDrawingTwice = true; return }

    const currentYear = data.value.total[new Date().getFullYear()]

    const label = Widget.Label(` ${user.value} | ${currentYear} contributions in the last year`)

    const grid = Grid({
      rowSpacing: 2,
      columnSpacing: 2,
      className: 'contrib-container',
      setup(self: typeof Widget.Box) {
        for (let i = 0; i < 7; i++)
          self.insert_row(i)
        for (let i = 0; i < Math.ceil(180 / 7); i++)
          self.insert_column(i)

        const span = 1

        for (let i = 0; i < 180; i++)
          self.attach(
            ContribBox(data.value.contributions[i]),
            Math.floor(i / 7),
            (i % 7),
            span, span
          )

        self.show_all()
      }
    })

    self.children = [label, grid]
  })
