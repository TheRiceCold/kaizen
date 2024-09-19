import { VBox } from 'widgets'
import icons from 'data/icons'

const { Box, Button, Icon, Label } = Widget

export default (title: string, ...items) => VBox(
  { className: 'group' },
  Box([
    Label({
      vpack: 'end',
      label: title,
      hpack: 'start',
      className: 'group-title',
      setup: w => Utils.idle(() => w.visible = !!title),
    }),
    title ? Button({
      hpack: 'end',
      hexpand: true,
      className: 'group-reset',
      sensitive: Utils.merge(
        items.map(({ attribute: { opt } }) => opt.bind().as(v => v !== opt.initial)),
        (...values) => values.some(b => b),
      ),
      onClicked() { items.forEach(row => row.attribute.opt.reset()) },
    }, Icon(icons.ui.refresh)) : Widget.Box(),
  ]), VBox([...items]),
)
