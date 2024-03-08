import cava from 'misc/cava'
import options from 'options'
import PanelButton from '../PanelButton'

// const mpris = await Service.import('mpris')
const { cava: { bars, width, height }, action } = options.bar.media

export default () => PanelButton({
  onClicked: action.bind(),
  className: 'cava-container',
  // visible: !!mpris.players.length,
  child: cava({ bars: bars * width, width, height }),
})
