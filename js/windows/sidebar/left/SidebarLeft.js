import { App, Utils, Widget } from '../../../imports.js'
import { NavigationIndicator } from '../../../misc/main.js'

import toolBox from './Toolbox.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'
// import apiwidgets from './ApiWidgets.js'

const { Gdk } = imports.gi

const contents = [
  {
    name: 'apis',
    // content: apiWidgets,
    materialIcon: 'api',
    friendlyName: 'APIs',
  },
  {
    name: 'tools',
    content: toolBox,
    materialIcon: '󰦬',
    friendlyName: 'Tools',
  },
]
let currentTabId = 0

const contentStack = Widget.Stack({
  vexpand: true,
  transition: 'slide_left_right',
  items: contents.map(item => [item.name, item.content]),
})

function switchToTab(id) {
  const allTabs = navTabs.get_children()
  const tabButton = allTabs[id]
  allTabs[currentTabId].toggleClassName('sidebar-selector-tab-active', false)
  allTabs[id].toggleClassName('sidebar-selector-tab-active', true)
  contentStack.shown = contents[id].name
  if (tabButton) {
    const buttonWidth = tabButton.get_allocated_width()
    const highlightWidth = tabButton.get_children()[0].get_allocated_width()
    navIndicator.css = `
      font-size: ${id}px; 
      padding: 0px ${(buttonWidth - highlightWidth) / 2}px;
    `
  }
  currentTabId = id
}
const SidebarTabButton = navIndex => Widget.Button({
  className: 'sidebar-selector-tab',
  onClicked: () => switchToTab(navIndex),
  child: Widget.Box({
    hpack: 'center',
    className: 'spacing-h-5',
    children: [
      Widget.Label(contents[navIndex].materialIcon, 'larger'),
      Widget.Label({
        className: 'txt txt-smallie',
        label: `${contents[navIndex].friendlyName}`,
      })
    ]
  }),
  setup: btn => Utils.timeout(1, () => {
    setupCursorHover(btn)
    btn.toggleClassName('sidebar-selector-tab-active', currentTabId == navIndex)
  }),
})

const navTabs = Widget.Box({
  homogeneous: true,
  children: contents.map((item, id) =>
    SidebarTabButton(id, item.materialIcon, item.friendlyName)
  ),
})

const navIndicator = NavigationIndicator(2, false, {
  className: 'sidebar-selector-highlight',
  css: 'font-size: 0; padding: 0 4.160rem;',
})

const navBar = Widget.Box({
  hexpand: true,
  vertical: true,
  children: [navTabs, navIndicator]
})

const pinButton = Widget.Button({
  properties: [
    ['enabled', false],
    ['toggle', self => {
      self._enabled = !self._enabled
      self.toggleClassName('sidebar-pin-enabled', self._enabled)

      const sideleftWindow = App.getWindow('sideleft')
      const barWindow = App.getWindow('bar')
      const cornerTopLeftWindow = App.getWindow('cornertl')
      const sideleftContent = sideleftWindow.get_children()[0].get_children()[0].get_children()[1]

      sideleftContent.toggleClassName('sidebar-pinned', self._enabled)

      if (self._enabled) {
        barWindow.layer = 'bottom'
        sideleftWindow.layer = 'bottom'
        cornerTopLeftWindow.layer = 'bottom'
        sideleftWindow.exclusivity = 'exclusive'
      }
      else {
        barWindow.layer = 'top'
        sideleftWindow.layer = 'top'
        cornerTopLeftWindow.layer = 'top'
        sideleftWindow.exclusivity = 'normal'
      }
    }],
  ],
  vpack: 'start',
  className: 'sidebar-pin',
  tooltipText: 'Pin sidebar',
  child: Widget.Label({ label: '󰐃', className: 'txt-larger' }),
  onClicked: self => self._toggle(self),
  connections: [[App, (self, currentName, visible) => {
    if (currentName === 'sideleft' && visible)
      self.grab_focus()
  }]]
})

export default () => Widget.Box({
  vexpand: true,
  hexpand: true,
  css: 'min-width: 2px;',
  children: [
    Widget.EventBox({
      onPrimaryClick: () => App.closeWindow('sideleft'),
      onSecondaryClick: () => App.closeWindow('sideleft'),
      onMiddleClick: () => App.closeWindow('sideleft'),
    }),
    Widget.Box({
      vexpand: true,
      vertical: true,
      className: 'sidebar-left spacing-v-10',
      children: [
        Widget.Box({ className: 'spacing-h-10', children: [navBar, pinButton] }),
        contentStack,
      ],
      connections: [[App, (self, currentName, visible) => {
        if (currentName === 'sideleft')
          self.toggleClassName('sidebar-pinned', pinButton._enabled && visible)
      }]]
    }),
  ],
  connections: [
    ['key-press-event', (widget, event) => { // Handle keybinds
      if (event.get_state()[1] & Gdk.ModifierType.CONTROL_MASK) {
        if (event.get_keyval()[1] == Gdk.KEY_p)
          pinButton._toggle(pinButton)
        else if (event.get_keyval()[1] === Gdk.KEY_Tab)
          switchToTab((currentTabId + 1) % contents.length)
        else if (event.get_keyval()[1] === Gdk.KEY_Page_Up)
          switchToTab(Math.max(currentTabId - 1, 0))
        else if (event.get_keyval()[1] === Gdk.KEY_Page_Down)
          switchToTab(Math.min(currentTabId + 1, contents.length - 1))
      }
      // if (contentStack.shown == 'apis') { // If api tab is focused
      //   // Automatically focus entry when typing
      //   if ((
      //     !(event.get_state()[1] & Gdk.ModifierType.CONTROL_MASK) &&
      //     event.get_keyval()[1] >= 32 && event.get_keyval()[1] <= 126 &&
      //     widget != chatEntry && event.get_keyval()[1] != Gdk.KEY_space)
      //     ||
      //     ((event.get_state()[1] & Gdk.ModifierType.CONTROL_MASK) &&
      //       event.get_keyval()[1] === Gdk.KEY_v)
      //   ) {
      //     chatEntry.grab_focus()
      //     chatEntry.set_text(chatEntry.text + String.fromCharCode(event.get_keyval()[1]))
      //     chatEntry.set_position(-1)
      //   }
      //   // Switch API type
      //   else if (!(event.get_state()[1] & Gdk.ModifierType.CONTROL_MASK) &&
      //     event.get_keyval()[1] === Gdk.KEY_Page_Down) {
      //     const toSwitchTab = contentStack.get_visible_child()
      //     toSwitchTab._nextTab()
      //   }
      //   else if (!(event.get_state()[1] & Gdk.ModifierType.CONTROL_MASK) &&
      //     event.get_keyval()[1] === Gdk.KEY_Page_Up) {
      //     const toSwitchTab = contentStack.get_visible_child()
      //     toSwitchTab._prevTab()
      //   }
      // }
    }],
  ],
})
