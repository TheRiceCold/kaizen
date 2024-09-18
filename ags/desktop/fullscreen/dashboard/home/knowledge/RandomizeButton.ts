import { ButtonLabel } from 'widgets'

import items from './items'
import options from 'options'
import { findCommonElement } from 'lib/utils'

export function randomize(tab) {
  const { data, hidden } = options.dashboard.knowledge[tab.value]
  const item = items.find(i => i.title === tab.value)
  let list = [...data.value]

  list = list.filter(i => {
    const hideTags = !findCommonElement(i.tags, hidden.value.filter(i => i.includes('tag:')))

    if ('filterItem' in item) {
      const { filterItem } = item
      const hiddenItems = hidden.value.filter(i => i.includes(`${filterItem}:`))
      const hideItems = !hiddenItems.includes(`${filterItem}:${i[filterItem]}`)
      return hideItems || hideTags
    }

    return hideTags
  })

  item.currentValue.value = list[Math.floor(Math.random() * list.length)]
}

export default tab => ButtonLabel(
  '', () => randomize(tab), {
    tooltipText: 'Randomize',
    visible: tab.bind().as((t: string) => t !== 'filter'),
  })
