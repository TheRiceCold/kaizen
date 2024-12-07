import { Variable } from 'astal'
import { Gtk } from 'astal/gtk3'

import { Cava, Audio, Player, Brightness } from './content' 

import { IndicatorType } from '.'
import options from 'options'

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
