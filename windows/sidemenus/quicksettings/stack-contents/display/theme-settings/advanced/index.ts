import { Title } from '..'

export default Widget.Box(
  { vertical: true, className: 'advanced-stack' },
  Title({ label: 'Advanced', leftTo: 'themes', rightTo: 'general' }),
)
