import { ButtonLabel } from 'widgets'
import TabTitle from './TabTitle'
import RandomizeButton from '../RandomizeButton'
import { ApplyButton } from '../FilterTab'

const LeftButton = (tab, lastTab) => Widget.Box(
  { hpack: 'start' },
  ButtonLabel('', () => {
    lastTab.value = tab.value
    tab.value = 'filter'
  }, {
    tooltipText: 'Filter Options',
    visible: tab.bind().as((t: string) => t !== 'filter'),
  }),
  ButtonLabel('', () => tab.value = lastTab.value, { visible: tab.bind().as((t: string) => t === 'filter') })
)

export default (tab, lastTab) => Widget.CenterBox({
  vpack: 'start', className: 'header',
  startWidget: LeftButton(tab, lastTab),
  centerWidget: TabTitle(tab, lastTab),
  endWidget: Widget.Box({ hpack: 'end' }, RandomizeButton(tab), ApplyButton(tab, lastTab)),
})
