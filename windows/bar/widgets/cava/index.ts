import cava from 'misc/cava'
import PanelButton from '../PanelButton'

export default () => PanelButton({
  className: 'cava-container',
  child: cava({
    bars: 64,
    width: 8,
    height: 24,
  })
})
