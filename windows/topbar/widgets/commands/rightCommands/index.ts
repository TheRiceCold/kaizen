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
  { label: 'Mirror', onClicked: () => { }  }, // TODO: implement using wl-mirror
  { label: 'Keys' }, // TODO: implement using showmethekeys-cli

  {
    label: 'Pick',
    onClicked: Colorpicker.pick,
    onSecondaryClick: openColorPickMenu,
  },

  // TODO: menu options
  { label: 'Record ', onClicked: ScreenTools.record },
  { label: 'Snip ', onClicked: ScreenTools.snip  },

]

export default () => Revealer('left', commands)

/* NOTE: If there's more command to be added then maybe
 * consider putting everything in one command like "(Screen  )"?
 * for less spacing and use a popup for the command options
 */
