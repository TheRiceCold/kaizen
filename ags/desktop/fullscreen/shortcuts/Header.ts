import { VBox } from 'widgets'

const { Box, Label } = Widget
export default VBox(
  { className: 'header' },
  Box(
    { hpack: 'center', className: 'title' },
    Label({
      label: 'Shortcut keys',
      css: 'font-size: 3em; margin-right: 0.25em;',
    }),
    Label({
      label: '⌘ + Slash',
      css: 'font-size: 2em;',
      className: 'cheatsheet-key',
    }),
  ),
  Label({
    useMarkup: true,
    selectable: true,
    className: 'data-stored',
    label: 'Sheet data stored in <tt>~/.config/ags/data/shortcuts.ts</tt>'
  }),
  Label({
    className: 'data-stored',
    label: 'Window Directions: h = left, j = down, k = up, l = right'
  }),
)
