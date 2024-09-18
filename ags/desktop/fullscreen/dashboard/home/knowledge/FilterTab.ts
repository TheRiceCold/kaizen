import { ButtonLabel } from 'widgets'
import { randomize } from './RandomizeButton'

import items from './items'
import options from 'options'
import { uniqueArray } from 'lib/utils'

let hiddenList = []
const opts = options.dashboard.knowledge

export const ApplyButton = (tab, lastTab) => ButtonLabel(
  'Apply', () => {
    randomize(lastTab)
    tab.value = lastTab.value
    opts[lastTab.value].hidden.value = uniqueArray(hiddenList)
  }, { className: 'apply-btn', visible: tab.bind().as((t: string) => t === 'filter') }
)

const Checkbox = (label, lastTab) => Widget.ToggleButton({
  xalign: 0,
  cursor: 'pointer',
  className: 'checkbox',
  attribute: {
    hiddenItems: opts[lastTab.value].hidden,
    item: `${lastTab.value.slice(0, -1)}:${label}`,
    getLabel: ({active}) => active ? ` ${label}` : ` ${label}`
  },
  onToggled(self) {
    const { item, getLabel, hiddenItems } = self.attribute
    hiddenList = [...hiddenItems.value]
    self.label = getLabel(self)

    if (self.active) {
      const index = hiddenList.indexOf(item)
      hiddenList.splice(index, 1)
    } else hiddenList.push(item)
  },
  setup(self) {
    const { item, getLabel, hiddenItems } = self.attribute
    self.hook(hiddenItems, () => {
      self.active = !hiddenItems.value.includes(item)
      self.label = getLabel(self)
    })
  }
})

const List = (data, lastTab) => Widget.Scrollable(
  { hscroll: 'never', className: 'list' },
  Widget.Box({
    vpack: 'start', vertical: true,
    setup(self) {
      self.children = uniqueArray(data).map(label => Checkbox(label, lastTab))
    }
  }),
)

export default lastTab => Widget.Box({
  homogeneous: true,
  className: 'filter',
}).hook(lastTab, self => {
  const data = opts[lastTab.value].data.value
  const currentItem = items.find(v => v.title === lastTab.value)

  const children = [ List(data.map(i => i.tags).flat(), lastTab) ]

  if ('filterItem' in currentItem) {
    const filterItemList = data.map(v => v[currentItem.filterItem])

    children.push(List(filterItemList, lastTab))
  }

  self.children = children
})
