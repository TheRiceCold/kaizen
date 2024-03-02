import cava from 'misc/cava'
import options from 'options'
import PanelButton from '../PanelButton'

const mpris = await Service.import('mpris')
const { bars, width, height, action } = options.bar.cava

export default () => PanelButton({
  onClicked: action.bind(),
  className: 'cava-container',
  // visible: !!mpris.players.length,
  child: cava({ bars: bars * width, width, height }),
})
