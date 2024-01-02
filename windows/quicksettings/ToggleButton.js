import { App, Widget, Variable, Utils } from '../../imports.js'
import { FontIcon } from '../../misc/main.js'
import icons from '../../icons.js'

export const opened = Variable('')
App.connect('window-toggled', (_, name, visible) => {
  if (name === 'quicksettings' && !visible)
    Utils.timeout(500, () => opened.value = '')
})

export const Arrow = (name, activate) => {
  let deg = 0
  let iconOpened = false
  return Widget.Button({
    child: FontIcon({
      icon: icons.ui.arrow.right,
      connections: [[opened, icon => {
        if (opened.value === name && !iconOpened || opened.value !== name && iconOpened) {
          const step = opened.value === name ? 10 : -10
          iconOpened = !iconOpened
          for (let i = 0; i < 9; ++i) {
            Utils.timeout(15 * i, () => {
              deg += step
              icon.setCss(`-gtk-icon-transform: rotate(${deg}deg)`)
            })
          }
        }
      }]],
    }),
    onClicked: () => {
      opened.value = opened.value === name ? '' : name
      if (typeof activate === 'function') activate()
    },
  })
}

export const ArrowToggleButton = ({
  name,
  icon,
  label,
  activate,
  deactivate,
  activateOnArrow = true,
  connection: [service, condition],
}) => Widget.Box({
  class_name: 'toggle-button',
  connections: [[service, box => {
    box.toggleClassName('active', condition())
  }]],
  children: [
    Widget.Button({
      child: Widget.Box({
        hexpand: true,
        children: [icon, label],
        className: 'label-box horizontal',
      }),
      onClicked: () => {
        if (condition()) {
          deactivate()
          if (opened.value === name)
            opened.value = ''
        } else activate()
      },
    }),
    Arrow(name, activateOnArrow && activate),
  ],
})

export const Menu = ({ name, icon, title, content }) => Widget.Revealer({
  transition: 'slide_down',
  binds: [['reveal-child', opened, 'value', v => v === name]],
  child: Widget.Box({
    classNames: ['menu', name],
    vertical: true,
    children: [
      Widget.Box({
        children: [icon, title],
        className: 'title horizontal',
      }),
      Widget.Separator(),
      ...content,
    ],
  }),
})

export const SimpleToggleButton = ({
  icon,
  toggle,
  connection: [service, condition],
}) => Widget.Button({
  className: 'simple-toggle',
  connections: [[service, box => {
    box.toggleClassName('active', condition())
  }]],
  child: icon,
  on_clicked: toggle,
})
