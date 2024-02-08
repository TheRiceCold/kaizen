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

const Button = ({ icon, title, subComponent = Widget.Box({ }) }, id) => Widget.Button({
  setup: setupCursorHover,
  className: 'toggle-button',
  onClicked: () => toggleSwitch(id),
  tooltipText: 'Right-click to configure',
  child: Widget.Box({
    vertical: true,
    children: [
      FontIcon({ icon, className: 'toggle-button-icon' }),
      Widget.Label({ label: title, className: 'title' }),
      subComponent,
    ]
  })
})

export default Widget.Box({
  vertical: true,
  vpack: 'center',
  spacing: options.spacing.value,
  children: [
    Row({ children: contents.map((item, id) => Button(item, id)) }),
  ]
})
