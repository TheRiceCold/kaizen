import Revealer from '../revealer'
import ScreenTools from 'service/screen'
import Colorpicker from 'service/colorpicker'
import { openColorPickMenu } from './ColorPickMenu'

const systemtray = await Service.import('systemtray')

const commands = [
  {
    label: 'Draw',
    tooltipText: 'gromit-mpx',
    onClicked: () => {
      ScreenTools.draw()

      // TODO: Open a popup menu
      const gromit = systemtray.items.find(i => i.id === 'gromit-mpx')
    }
  },
  { label: 'Zoom', onClicked: ScreenTools.zoom },
  { label: 'Record', onClicked: ScreenTools.record },
  { label: 'Snip', onClicked: ScreenTools.snip  }, // TODO: menu for options
  {
    label: 'Pick',
    onClicked: Colorpicker.pick,
    onSecondaryClick: openColorPickMenu,
  },
]

export default () => Revealer('left', commands)
