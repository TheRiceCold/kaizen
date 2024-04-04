import { Title } from '..'

import options from 'options'

const { theme: { blur, border, radius }, font } = options

export default Widget.Box({
  vertical: true,
  children: [
    Title('Colorschemes', 'left', 'general'),
  ]
})
