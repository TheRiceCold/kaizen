import { ButtonLabel } from 'widgets'

import items from '../items'
import { capitalize } from 'lib/utils'

const MoveButton = (dir: 'next' | 'prev', tab) => ButtonLabel(
  (dir === 'next') ? '' : '', () => {
    const currentIndex = items.findIndex(item => item.title === tab.value)
    const lastIndex = items.length - 2 // To exclude filter tab

    switch(dir) {
      case 'next':
        if (currentIndex === lastIndex)
          tab.value = items[0].title
        else
          tab.value = items[currentIndex+1].title
        break
      case 'prev':
        if (currentIndex < 1)
          tab.value = items[lastIndex].title
        else
          tab.value = items[currentIndex-1].title
        break
      default:
        tab.value = items[0].title
        break
    }
  }, { visible: tab.bind().as((t: string) => t !== 'filter') })

export default (tab, lastTab) => Widget.Box(
  { className: 'tabs' },
  MoveButton('prev', tab),
  Widget.Label({
    className: 'title',
    label: Utils.merge([tab.bind(), lastTab.bind()], (t, lt) =>
      (t === 'filter') ? `${capitalize(lt)}: Filter Settings` : capitalize(t))
  }),
  MoveButton('next', tab),
)
