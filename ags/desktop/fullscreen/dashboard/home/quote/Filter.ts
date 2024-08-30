import options from 'options'
import QuoteStack from '.'

type ListType = 'tag' | 'name'

const { hidden, data } = options.quotes
const list = [...hidden.value]

const CheckBox = (type: ListType, label: string) => Widget.ToggleButton({
  xalign: 0,
  cursor: 'pointer',
  className: 'checkbox',
  onToggled(self) {
    const val = `${type}:${label}`
    self.label = self.active ? ` ${label}` : ` ${label}`

    if (self.active) {
      const index = list.indexOf(val)
      list.splice(index, 1)
    }
    else list.push(val)
  },
}).hook(hidden, self => {
  self.active = !hidden.value.includes(`${type}:${label}`)
})

const Header = Widget.Box({
  vpack: 'start',
  homogeneous: true,
  className: 'filter-header',
  children: [
    Widget.Button({
      label: '',
      hpack: 'start',
      cursor: 'pointer',
      onClicked() { QuoteStack.shown = 'quote' }
    }),
    Widget.Label('Filter Options'),
    Widget.Button({
      hpack: 'end',
      label: 'Apply',
      cursor: 'pointer',
      className: 'apply-btn',
      onClicked() {
        QuoteStack.shown = 'quote'
        hidden.setValue(list)
      }
    })
  ]
})

const List = (type: ListType, list: string[]) => Widget.Scrollable(
  { hscroll: 'never', className: 'list' },
  Widget.Box({
    hpack: 'start',
    vertical: true,
    setup(self) {
      self.children = list
        .filter((item, pos) => list.indexOf(item) === pos)
        .map(label => CheckBox(type, label))
    }
  }),
)

export default Widget.Overlay({
  overlay: Header,
  passThrough: true,
  className: 'filter',
  child: Widget.Box({ homogeneous: true }).hook(data, self => {
    self.children = [
      List('tag', data.value.map(quote => quote.tags).flat()),
      List('name', data.value.map(quote => quote.name)),
    ]
  }),
})
