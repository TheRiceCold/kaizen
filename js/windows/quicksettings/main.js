import { App, Widget, Utils, Hyprland } from '../../imports.js'
// import RoundedCorner from "../roundedCorner/index.js"
import { Quicksettings } from './QuickSettings.js'
import { StackState } from '../../services/main.js'
import { icons } from '../../constants/main.js'
import { FontIcon } from '../../misc/main.js'

const { Gdk } = imports.gi
export const QSState = new StackState('Audio')

const ModuleReloadIcon = (props = {}) => Widget.Button({
  ...props,
  className: 'qs-switcher-button',
  tooltip_text: 'Reload Hyprland',
  onClicked: () => {
    Hyprland.sendMessage('reload')
    App.toggleWindow('quicksettings')
  },
  child: FontIcon(icons.header.refresh)
})

const ModuleSettingsIcon = (props = {}) => Widget.Button({
  ...props,
  className: 'qs-switcher-button',
  tooltip_text: 'Open Settings',
  onClicked: () => {
    Utils.execAsync(['bash', '-c', 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center'])
    App.toggleWindow('quicksettings')
  },
  child: FontIcon(icons.header.settings)
})

const ModulePowerIcon = (props = {}) => Widget.Button({
  ...props,
  class_name: 'qs-switcher-button',
  tooltip_text: 'Session',
  onClicked: () => {
    App.toggleWindow('session')
    App.closeWindow('quicksettings')
  },
  child: FontIcon(icons.header.power)
})

const SettingsButtons = () => Widget.Box({
  vertical: true,
  children: [
    ModuleReloadIcon(),
    ModuleSettingsIcon(),
    ModulePowerIcon()
  ]
})

/**
 * @param {string} item
 */
const StackSwitcherButton = item => Widget.Button({
  class_name: 'qs-switcher-button',
  tooltip_text: item,
  child: FontIcon(icons.quicksettings[item.toLowerCase()] || 'image-missing'),
  on_clicked: () => QSState.value = item,
})
  .hook(QSState, button => {
    button.toggleClassName('focused', QSState.value == item)
    const focusedID = QSState.items.indexOf(QSState.value)
    button.toggleClassName('before-focused', QSState.items[focusedID-1] == item)
    button.toggleClassName('after-focused', QSState.items[focusedID+1] == item)
  })

/**
 * @param {boolean} start
 */
const StackSwitcherPadding = start => Widget.Box({
  class_name: 'qs-switcher-button',
  vexpand: true,
  children: [Widget.Icon()]
})
  .hook(QSState, (box) => {
    const focusedID = QSState.items.indexOf(QSState.value)
    box.toggleClassName('before-focused', start && focusedID == 0)
    box.toggleClassName('after-focused', !start && focusedID == QSState.items.length - 1)
  })
/**
 * @param {string[]} items
 */
const StackSwitcher = items => Widget.Box({
  vertical: true,
  class_name: 'qs-switcher',
  children: [
    StackSwitcherPadding(true),
    ...items.map(i => StackSwitcherButton(i)),
    StackSwitcherPadding(false),
    SettingsButtons(),
  ]
})

const QSStack = () => Widget.Stack({
  visible_child_name: QSState.bind(),
  transition: 'over_left',
  class_name: 'quicksettings',
  items: [
    ...Quicksettings()
  ]
})

export default () => {
  const stack = QSStack()
  QSState.items = stack.items.map(i => i[0])
  const stackSwitcher = StackSwitcher(stack.items.map(i => i[0]))
  return Widget.Window({
    popup: true,
    visible: false,
    focusable: true,
    name: 'quicksettings',
    anchor: ['right', 'top', 'bottom'],
    child: Widget.Box({
      css: 'padding-left: 2px',
      children: [
        Widget.Box({
          children: [
            Widget.Overlay({
              child: Widget.Box({
                children: [
                  Widget.Box({css: 'min-width: 1rem'}),
                  Widget.Revealer({
                    reveal_child: false,
                    child: stack,
                    transition_duration: 350,
                    transition: 'slide_left'
                  }).hook(App, (revealer, name, visible) => {
                    if (name === 'quicksettings') {
                      if(visible) Utils.timeout(100, () => revealer.reveal_child = visible)
                      else revealer.reveal_child = visible
                    }
                  }),
                ]
              }),
              // overlays: [
              //   RoundedCorner("topright", {class_name: "corner"}),
              //   RoundedCorner("bottomright", {class_name: "corner"}),
              // ]
            }),
          ]
        }),
        Widget.Revealer({
          reveal_child: false,
          transition: 'slide_left',
          transition_duration: 350,
          child: stackSwitcher,
        }).hook(App, (revealer, name, visible) => {
          if (name === 'quicksettings') {
            if(visible) revealer.reveal_child = visible
            else Utils.timeout(100, () => revealer.reveal_child = visible)
          }
        })
      ]
    })
  })
    .on('key-press-event', (_, event) => {
      const keyval = event.get_keyval()[1]
      if (event.get_state()[1] != (Gdk.ModifierType.MOD1_MASK | Gdk.ModifierType.MOD2_MASK)) return
      switch (keyval) {
        case Gdk.KEY_n:
        case Gdk.KEY_Tab:
          QSState.next()
          break
        case Gdk.KEY_p:
          QSState.prev()
          break
        case Gdk.KEY_0:
        case Gdk.KEY_KP_0:
          QSState.setIndex(0)
          break
        case Gdk.KEY_1:
        case Gdk.KEY_KP_1:
          QSState.setIndex(1)
          break
        case Gdk.KEY_2:
        case Gdk.KEY_KP_2:
          QSState.setIndex(2)
          break
        case Gdk.KEY_3:
        case Gdk.KEY_KP_3:
          QSState.setIndex(3)
          break
        case Gdk.KEY_4:
        case Gdk.KEY_KP_4:
          QSState.setIndex(4)
          break
        case Gdk.KEY_5:
        case Gdk.KEY_KP_5:
          QSState.setIndex(5)
          break
        case Gdk.KEY_6:
        case Gdk.KEY_KP_6:
          QSState.setIndex(6)
          break
        case Gdk.KEY_7:
        case Gdk.KEY_KP_7:
          QSState.setIndex(7)
          break
        case Gdk.KEY_8:
        case Gdk.KEY_KP_8:
          QSState.setIndex(8)
          break
        case Gdk.KEY_9:
        case Gdk.KEY_KP_9:
          QSState.setIndex(9)
          break
      }
    })
}

