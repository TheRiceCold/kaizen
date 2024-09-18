import Content from './Content'
import { ButtonLabel } from 'widgets'

export default (icon, currentVerse) => Content(
  'verse', icon,
  currentVerse.bind().as(v => v.content),
  Widget.Box({ hpack: 'center' },
    ButtonLabel('', () => { }),
    ButtonLabel(
      currentVerse.bind().as(v => `${v.book} ${v.verse}`),
      () => { },
      { className: 'name' },
    ),
    ButtonLabel('', () => { }),
  )
)
