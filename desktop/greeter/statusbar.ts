import { clock } from 'lib/variables'
import options from 'options'
import icons from 'lib/icons'
// import BatteryBar from 'widget/bar/buttons/BatteryBar'
import BarButton from 'windows/topbar/BarButton'

const { scheme } = options.theme

const poweroff = BarButton({
  className: 'powermenu',
  onClicked() { Utils.exec('shutdown now') },
  child: Widget.Icon(icons.powermenu.shutdown),
})

const date = BarButton({
  className: 'date',
  child: Widget.Label({
    label: clock.bind().as(c => c.format('%I:%M %p')!),
  }),
})

const darkmode = BarButton({
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
    // BatteryBar(),
    poweroff,
  ),
})
