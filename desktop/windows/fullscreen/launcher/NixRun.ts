import icons from 'data/icons'
import nix, { type Nixpkg } from 'service/nix'

const iconVisible = Variable(false)

function Item(pkg: Nixpkg) {
  const name = Widget.Label({
    className: 'name',
    label: pkg.name.split('.').at(-1),
  })

  const subpkg = pkg.name.includes('.') ? Widget.Label({
    hpack: 'end',
    hexpand: true,
    className: 'description',
    label: `  ${pkg.name.split('.').slice(0, -1).join('.')}`,
  }) : null

  const version = Widget.Label({
    hpack: 'end',
    hexpand: true,
    label: pkg.version,
    className: 'version',
  })

  const description = pkg.description ? Widget.Label({
    wrap: true,
    hpack: 'start',
    maxWidthChars: 40,
    justification: 'left',
    label: pkg.description,
    className: 'description',
  }) : null

  return Widget.Box(
    {
      vertical: true,
      attribute: { name: pkg.name },
    },
    Widget.Separator(),
    Widget.Button(
      {
        className: 'nix-item',
        onClicked() {
          nix.run(pkg.name)
          App.closeWindow('launcher')
        },
      },
      Widget.Box(
        { vertical: true },
        Widget.Box([name, version]),
        Widget.Box([
          description as ReturnType<typeof Widget.Label>,
          subpkg as ReturnType<typeof Widget.Label>,
        ]),
      ),
    ),
  )
}

export function Spinner() {
  const icon = Widget.Icon({
    icon: icons.nix.nix,
    className: 'spinner',
    css: `
      @keyframes spin {
        to { -gtk-icon-transform: rotate(1turn); }
      }

      image.spinning {
        animation-name: spin;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
    `,
  }).hook(nix, self => self.toggleClassName('spinning', !nix.ready))

  return Widget.Revealer({
    child: icon,
    transition: 'slide_left',
    revealChild: Utils.merge([
      nix.bind('ready'),
      iconVisible.bind(),
    ], (ready, show) => !ready || show),
  })
}

export function NixRun() {
  const list = Widget.Box<ReturnType<typeof Item>>({ vertical: true })
  const revealer = Widget.Revealer({ child: list })

  async function filter(term: string) {
    iconVisible.value = Boolean(term)

    if (!term) 
      revealer.revealChild = false

    if (term.trim()) {
      const found = await nix.query(term)
      list.children = found.map(k => Item(nix.db[k]))
      revealer.revealChild = true
    }
  }

  return Object.assign(revealer, { filter, run: nix.run })
}
