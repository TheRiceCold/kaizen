import Annotation from 'service/annotation'

import Revealer from '../Revealer'
import { 
  openKeyMenu, 
  openZoomMenu, 
  openSnipMenu,
  openRecordMenu, 
} from './menus'

import { toggleWidget } from 'lib/globals'

const commands = [
  {
    label: 'Draw',
    tooltipText: 'gromit-mpx',
    onClicked: () => Annotation.start(),
  },
  { label: 'Colors', onClicked: () => toggleWidget('color')},
  // { label: 'Mirror', onClicked: () => { }  }, // TODO: implement using wl-mirror
  { label: 'Keys ', onClicked: openKeyMenu },
  { label: 'Zoom ', onClicked: openZoomMenu },
  { label: 'Record ', onClicked: openRecordMenu },
  { label: 'Snip ', onClicked: openSnipMenu },
]

export default Revealer('left', commands)

/* NOTE: If there's more command to be added then maybe
 * consider putting everything in one command like "(Screen  )"?
 * for less spacing and use a popup for the command options
 */
