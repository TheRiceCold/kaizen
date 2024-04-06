import Revealer from '../revealer'
import { 
  openKeyMenu, 
  openZoomMenu, 
  openSnipMenu,
  openColorMenu,
  openRecordMenu, 
} from './menus'

import { toggleWidget } from 'lib/globals'

const commands = [
  {
    label: 'Draw',
    tooltipText: 'gromit-mpx',
    onClicked: () => toggleWidget('popup', 'drawingTools'),
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
