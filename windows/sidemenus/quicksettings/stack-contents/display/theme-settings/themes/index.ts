import { Title } from '..'
import Adjustments from './Adjustments'
import DarkColors from './DarkColors'
import LightColors from './LightColors'
import CustomThemes from './CustomThemes'

export default Widget.Box(
  { vertical: true, className: 'themes-stack' },
  Title('Themes', 'left', 'general'),
  Adjustments,
  DarkColors,
  LightColors,
  CustomThemes,
)
