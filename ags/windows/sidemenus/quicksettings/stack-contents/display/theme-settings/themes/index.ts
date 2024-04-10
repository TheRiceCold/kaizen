import { Title } from '..'
import Adjustments from './Adjustments'
import DarkColors from './DarkColors'
import LightColors from './LightColors'
import CustomThemes from './CustomThemes'

export default Widget.Box(
  { vertical: true, className: 'themes-stack' },
  Title({ label: 'Themes', leftTo: 'general', rightTo: 'advanced' }),
  Adjustments,
  DarkColors,
  LightColors,
  CustomThemes,
)
