import { Variable } from 'astal'
import { Gtk } from 'astal/gtk3'

//import Cava from './Cava'
import Player from './Player'
import Audio from './Audio'
import Brightness from './Brightness'

import { IndicatorType } from '.'

interface IProps {
  visibleChild: Variable<IndicatorType>
}

export default ({ visibleChild }: IProps) => (
  <stack
    className='indicator'
    transitionDuration={250}
    visibleChildName={visibleChild()}
    transitionType={Gtk.StackTransitionType.SLIDE_UP_DOWN}
  >
    <Brightness />
    <Audio type='speaker' />
    <Audio type='microphone' />
    <Player />
  </stack>
)
