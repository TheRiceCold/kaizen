import { type EntryProps } from 'types/widgets/entry'

import { VBox, Padding, RevealerWindow } from 'widgets'
import AppLauncher from './AppLauncher'

import options from 'options'
import icons from 'data/icons'

const launcher = AppLauncher()
const { width, margin } = options.run

const entry = Widget.Entry({
  hexpand: true,
  primaryIconName: icons.ui.search,
  attribute: {
    focus: () => {
      entry.set_position(-1)
      entry.select_region(0, -1)
      entry.grab_focus()
    }
  },
  onAccept(self: EntryProps) {
    launcher.launchFirst()

    App.toggleWindow('run')
    self.text = ''
  },
  onChange({ text }) {
    text ||= ''

    if (!text?.startsWith(':'))
      launcher.filter(text)
  },
})

const Run = VBox(
  { css: 'padding: 1px;' },
  Padding('applauncher', {
    vexpand: false,
    css: margin.bind().as((v: number) => `min-height: ${v}pt;`),
  }),

  VBox({
    vpack: 'start',
    className: 'layout',
    css: width.bind().as((v: number) => `min-width: ${v}pt;`),
  }, entry, launcher).hook(App, (_, win: string, visible: boolean) => {
    if (win !== 'run') return

    entry.text = ''
    if (visible)
      entry.attribute.focus()
  })
)

export default RevealerWindow({
  child: Run,
  name: 'run',
  layout: 'top',
  keymode: 'exclusive'
})
