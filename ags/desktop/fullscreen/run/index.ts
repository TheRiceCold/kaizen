import { type Binding } from 'lib/utils'
import Nix from 'service/nix'

import * as ShRun from './ShRun'
import * as NixRun from './NixRun'
import * as AppLauncher from './AppLauncher'
import RevealerWindow, { Padding } from 'desktop/RevealerWindow'

import options from 'options'
import icons from 'data/icons'

const { width, margin, nix: { pkgs: nixPkgs } } = options.run

function Run() {
  const sh = ShRun.ShRun()
  const shicon = ShRun.Icon()
  const nix = NixRun.NixRun()
  const nixload = NixRun.Spinner()
  const applauncher = AppLauncher.Launcher()

  const HelpButton = (cmd: string, desc: string | Binding<string>) => Widget.Box(
    { vertical: true },
    Widget.Separator(),
    Widget.Button(
      {
        className: 'help',
        onClicked() {
          entry.grab_focus()
          entry.text = `:${cmd} `
          entry.set_position(-1)
        },
      },
      Widget.Box([
        Widget.Label({ className: 'name', label: `:${cmd}` }),
        Widget.Label({
          label: desc,
          hpack: 'end',
          hexpand: true,
          className: 'description',
        }),
      ]),
    ),
  )

  const help = Widget.Revealer({
    child: Widget.Box(
      { vertical: true },
      HelpButton('sh', 'run a binary'),
      Nix.available ? HelpButton('nx',
        nixPkgs.bind().as(pkg => `run a nix package from ${pkg}`)
      ) : Widget.Box(),
    ),
  })

  const entry = Widget.Entry({
    hexpand: true,
    primaryIconName: icons.ui.search,
    onAccept({ text }) {
      if (text?.startsWith(':nx'))
        nix.run(text.substring(3))
      else if (text?.startsWith(':sh'))
        sh.run(text.substring(3))
      else
        applauncher.launchFirst()

      App.toggleWindow('run')
      entry.text = ''
    },
    onChange({ text }) {
      text ||= ''
      help.revealChild = text.split(' ').length === 1 && text?.startsWith(':')

      if (text?.startsWith(':nx'))
        nix.filter(text.substring(3))
      else nix.filter('')

      if (text?.startsWith(':sh'))
        sh.filter(text.substring(3))
      else sh.filter('')

      if (!text?.startsWith(':'))
        applauncher.filter(text)
    },
  })

  function focus() {
    entry.set_position(-1)
    entry.select_region(0, -1)
    entry.grab_focus()
  }

  const layout = Widget.Box({
    vpack: 'start',
    vertical: true,
    className: 'layout',
    css: width.bind().as(v => `min-width: ${v}pt;`),
    children: [
      Widget.Box([entry, nixload, shicon]),
      help, applauncher, nix, sh,
    ],
  }).hook(App, (self, win, visible) => {
    if (win !== 'run') return

    entry.text = ''
    if (visible) focus()
  })

  return Widget.Box(
    { vertical: true, css: 'padding: 1px;' },
    Padding('applauncher', {
      vexpand: false,
      css: margin.bind().as(v => `min-height: ${v}pt;`),
    }),
    layout,
  )
}

export default RevealerWindow({
  name: 'run',
  child: Run(),
  layout: 'top',
  keymode: 'exclusive',
})
