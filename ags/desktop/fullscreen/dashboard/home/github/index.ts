import options from 'options'

const { Gtk } = imports.gi
const contribData = Variable([])
const contribCount = Variable(0)
const user = options.dashboard.githubUser

Utils.execAsync([
  'curl', `https://github-contributions.vercel.app/api/v1/${user.value}`
]).then(x => {
  const out = JSON.parse(x)

  const daysLeftInYear = 365 - Number(Utils.exec('date +%j'))
  contribData.value = out.contributions.slice(daysLeftInYear)

  let count = 0
  out.years.forEach(y => count += y.total)
  contribCount.value = count
}).catch(err => print(err))

const ContribBox = (intensity = 0) => Widget.DrawingArea({
  className: 'intensity-'+intensity,
  tooltipText: intensity.toString(),
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

let stopDrawingTwice = false

const Grid = Widget.subclass(Gtk.Grid)
const ContribGrid = Grid({
  rowSpacing: 2,
  columnSpacing: 2,
  className: 'contrib-container',
}).hook(contribData, self => {
  if (!stopDrawingTwice) { stopDrawingTwice = true; return }

  for (let i = 0; i < 7; i++) self.insert_row(i)

  for (let i = 0; i < Math.ceil(180 / 7); i++)
    self.insert_column(i)

  const span = 1

  for (let i = 0; i < 180; i++)
    self.attach(
      ContribBox(contribData.value[i].intensity),
      Math.floor(i / 7),
      (i % 7),
      span, span
    )

  self.show_all()
})

export default Widget.Box({
  vertical: true,
  className: 'github',
  visible: contribCount.bind(),
}, Widget.Label({
  className: 'header',
  label: Utils.merge(
    [user.bind(), contribCount.bind()],
    (u, c) => ` ${u} | ${c} total lifetime contributions`)
}), ContribGrid)
