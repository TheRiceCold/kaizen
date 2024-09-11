import Content from './Content'

export default (icon, currentVerse) => Content(
  'verse', icon,
  currentVerse.bind().as(v => v.content),
  Widget.Box({ hpack: 'center' },
    Widget.Button({
      label: '',
      cursor: 'pointer',
      onClicked() { }
    }),
    Widget.Button({
      cursor: 'pointer',
      className: 'name',
      label: currentVerse.bind().as(v => `${v.book} ${v.verse}`)
    }),
    Widget.Button({
      label: '',
      cursor: 'pointer',
      onClicked() { }
    }),
  )
)
