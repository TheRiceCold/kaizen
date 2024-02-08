import Settings from './tab-contents/settings/main.js'

const currentTabId = 0
const contents = [
  { 
    icon: '',
    name: 'settings', 
    content: Settings
  },
  { 
    icon: '󱍓',
    name: 'utilities', 
    content: Widget.Box({}),
  },
  { 
    icon: '󰚩',
    name: 'apis', 
    content: Widget.Box({}),
  },
]

const ContentStack = Widget.Stack({
  vexpand: true,
  transition: 'slide_left_right',
  children: contents.reduce((acc, item) => {
    acc[item.name] = item.content
    return acc
  }, {})
})

export {
  ContentStack,
  currentTabId,
  contents,
}
