import { Variable } from 'astal'
import { Gtk } from 'astal/gtk3'

import Cava from './Cava'
import Audio from './Audio'
import Player from './Player'
import Brightness from './Brightness'

import options from 'options'
import { IndicatorType } from '.'

interface IProps {
  visibleChild: Variable<IndicatorType>
}

export default ({ visibleChild }: IProps) => (
  <stack
    className='indicator'
    visibleChildName={visibleChild()}
    transitionDuration={options.transition.get()}
    transitionType={Gtk.StackTransitionType.SLIDE_UP_DOWN}
  >
    <Brightness />
    <Audio type='speaker' />
    <Audio type='microphone' />
    <Player />
    <Cava />
  </stack>
)
