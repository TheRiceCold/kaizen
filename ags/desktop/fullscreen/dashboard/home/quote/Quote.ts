import options from 'options'
import Stack from '.'
import { findCommonElement } from 'lib/utils'

const { data, hidden } = options.quotes
let list = [...data.value]

const getRandom = () => {
  const hiddenTags = hidden.value.filter(i => i.includes('tag:'))
  const hiddenNames = hidden.value.filter(i => i.includes('name:'))

  list = list.filter(i => {
    const hideNames = !hiddenNames.includes(`name:${i.name}`)
    const hideTags = !findCommonElement(i.tags, hiddenTags)
    return hideNames || hideTags
  })

  return list[Math.floor(Math.random() * list.length)]
}

const currentQuote = Variable(data.value[0], { poll: [900000, getRandom] })

const Buttons = Widget.Box({
  homogeneous: true,
  className: 'header-buttons',
  children: [
    Widget.Button({
      label: '',
      hpack: 'start',
      cursor: 'pointer',
      tooltipText: 'Filter Options',
      onClicked() { Stack.shown = 'filter' }
    }),
    Widget.Button({
      label: '',
      hpack: 'end',
      cursor: 'pointer',
      tooltipText: 'Change Quote',
      onClicked() { currentQuote.value = getRandom() }
    })
  ]
})

const Content = [
  Buttons,
  Widget.Label({
    label: '󰝗',
    vpack: 'center',
    className: 'icon',
  }),
  Widget.Label({
    wrap: true,
    className: 'text',
    maxWidthChars: 48,
    justification: 'center',
    label: currentQuote.bind().as(v => v.quote),
  }),
  Widget.Label({
    valign: 1,
    className: 'name',
    justification: 'center',
    label: currentQuote.bind().as(v => v.name),
  })
]

export default Widget.Box({
  vertical: true,
  className: 'current-quote',
})
  .hook(data, self => self.children = Content)
  .hook(hidden, () => currentQuote.value = getRandom())
