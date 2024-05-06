import Annotation from 'service/annotation'

import screenTools from 'service/screen'
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
  { label: 'Snip ', onClicked: openSnipMenu },
  {
    label: Utils.merge([
      screenTools.bind('timer'),
      screenTools.bind('isRecording')
    ], (time, isRecording) => {
      if (!isRecording) return 'Record '
      const sec = time % 60
      const min = Math.floor(time / 60)
      return `Record: ${min}:${sec < 10 ? '0' + sec : sec}`
    }),
    onClicked(self) {
      if (!screenTools.isRecording) 
        openRecordMenu(self)
      else {
        screenTools.recorder('stop')
        self.label = 'Record '
      }
    },
    tooltipText: screenTools.bind('isRecording').as(isRecording => isRecording ? 'Click to stop' : ''),
  },
]

export default Revealer('left', commands)

/* NOTE: If there's more command to be added then maybe
 * consider putting everything in one command like "(Screen  )"?
 * for less spacing and use a popup for the command options
 */
