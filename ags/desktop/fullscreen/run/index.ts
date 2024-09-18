import * as AppLauncher from './AppLauncher'
import RevealerWindow, { Padding } from 'desktop/RevealerWindow'

import options from 'options'
import icons from 'data/icons'

const { width, margin } = options.run
const applauncher = AppLauncher.Launcher()

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
  onAccept(self) {
    applauncher.launchFirst()

    App.toggleWindow('run')
    self.text = ''
  },
  onChange({text}) {
    text ||= ''

    if (!text?.startsWith(':'))
      applauncher.filter(text)
  },
})

const Run =  Widget.Box(
  { vertical: true, css: 'padding: 1px;' },
  Padding('applauncher', {
    vexpand: false,
    css: margin.bind().as((v: number) => `min-height: ${v}pt;`),
  }),

  Widget.Box({
    vpack: 'start',
    vertical: true,
    className: 'layout',
    css: width.bind().as((v: number) => `min-width: ${v}pt;`),
  }, entry, applauncher)
    .hook(App, (_, win: string, visible: boolean) => {
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
