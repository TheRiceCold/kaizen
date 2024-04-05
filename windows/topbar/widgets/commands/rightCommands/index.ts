import Revealer from '../revealer'
import ScreenTools from 'service/screen'
import { 
  openKeyMenu, 
  openZoomMenu, 
  openSnipMenu,
  openColorMenu,
  openRecordMenu, 
} from './menus'

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
  { label: 'Mirror', onClicked: () => { }  }, // TODO: implement using wl-mirror

  { label: 'Keys ', onClicked: openKeyMenu },
  { label: 'Zoom ', onClicked: openZoomMenu },
  { label: 'Color ', onClicked: openColorMenu },
  { label: 'Record ', onClicked: openRecordMenu },
  { label: 'Snip ', onClicked: openSnipMenu },
]

export default () => Revealer('left', commands)

/* NOTE: If there's more command to be added then maybe
 * consider putting everything in one command like "(Screen  )"?
 * for less spacing and use a popup for the command options
 */
