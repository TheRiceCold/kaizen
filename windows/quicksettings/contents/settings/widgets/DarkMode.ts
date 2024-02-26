import { SimpleToggleButton } from '../ToggleButton'
import options from 'options'
import icons from 'data/icons'

const { scheme } = options.theme

export const DarkModeToggle = () => SimpleToggleButton({
  icon: scheme.bind().as(s => icons.color[s]),
  connection: [scheme, () => scheme.value === 'dark'],
  label: scheme.bind().as(s => s === 'dark' ? 'Dark' : 'Light'),
  toggle: () => scheme.value = scheme.value === 'dark' ? 'light' : 'dark',
})
