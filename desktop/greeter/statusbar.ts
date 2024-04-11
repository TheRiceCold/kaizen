import { clock } from 'lib/variables'
import options from 'options'
import icons from 'lib/icons'
import BatteryBar from 'widget/bar/buttons/BatteryBar'
import PanelButton from 'widget/bar/PanelButton'

const { scheme } = options.theme
const { monochrome } = options.bar.powermenu
const { format } = options.bar.date

const poweroff = PanelButton({
  className: 'powermenu',
  child: Widget.Icon(icons.powermenu.shutdown),
  onClicked: () => Utils.exec('shutdown now'),
}).hook(monochrome, () => {
  self.toggleClassName('colored', !monochrome.value)
  self.toggleClassName('box')
})

const date = PanelButton({
  className: 'date',
  child: Widget.Label({
    label: clock.bind().as(c => c.format(`${format}`)!),
  }),
})

const darkmode = PanelButton({
  className: 'darkmode',
  child: Widget.Icon({ icon: scheme.bind().as(s => icons.color[s]) }),
  onClicked: () => scheme.value = scheme.value === 'dark' ? 'light' : 'dark',
})

export default Widget.CenterBox({
  hexpand: true,
  className: 'bar',
  centerWidget: date,
  endWidget: Widget.Box({ hpack: 'end' },
    darkmode,
    BatteryBar(),
    poweroff,
  ),
})
