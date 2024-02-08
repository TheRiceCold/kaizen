import { FontIcon } from '../../../../../misc/main.js'
import { setupCursorHover } from '../../../../../misc/CursorHover.js'
import { options } from '../../../../../constants/main.js'
import { ListStack, contents, currentTabId } from '../exports.js'

function toggleSwitch(id) {
  ListStack.shown = contents[id].name
  currentTabId = id
}

const Row = props => Widget.Box({
  ...props,
  hpack: 'center',
  className: 'toggle-row',
  spacing: options.padding.value,
})

const Button = ({ icon, name }, id) => Widget.Button({
  setup: setupCursorHover,
  className: 'toggle-button',
  onClicked: () => toggleSwitch(id),
  tooltipText: 'Right-click to configure',
  child: Widget.Box({
    vertical: true,
    children: [
      FontIcon({ icon, className: 'toggle-button-icon' }),
      // Widget.Label({ label, className: 'title' }),
      // Widget.Label({ className: 'sub', label: sub })
    ]
  })
})

export default Widget.Box({
  vertical: true,
  vpack: 'center',
  spacing: options.spacing.value,
  children: [
    Row({ children: contents.map((item, id) => (id < 3) && Button(item, id)) }),
    Row({ children: contents.map((item, id) => (id > 2) && Button(item, id)) }),
  ]
})
