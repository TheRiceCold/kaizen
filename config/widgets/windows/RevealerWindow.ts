import { type WindowProps } from 'types/widgets/window'
import { type RevealerProps } from 'types/widgets/revealer'
import type Gtk from 'gi://Gtk?version=3.0'

import { VBox, Padding } from 'widgets'

import options from 'options'

type Transition = RevealerProps['transition']
type Child = WindowProps['child']

type RevealerWindowProps = Omit<WindowProps, 'name'> & {
  name: string
  layout?: keyof ReturnType<typeof Layout>
  transition?: Transition,
}

const { Window, Box, CenterBox } = Widget

const Revealer = (
  name: string,
  child: Child,
  transition: Transition = 'slide_down',
) => Box(
  { css: 'padding: 1px;' },
  Widget.Revealer({
    transition,
    transitionDuration: options.transition.bind(),
    setup(self: RevealerProps) {
      self.hook(App, (_, wname: string, visible: boolean) => {
        if (wname === name)
          self.revealChild = visible
      })
    },
  }, Box({ child, className: 'window-content' })),
)

const Layout = (name: string, child: Child, transition?: Transition) => ({
  center: () => CenterBox({
    startWidget: Padding(name),
    centerWidget: CenterBox(
      { vertical: true },
      Padding(name),
      Revealer(name, child, transition),
      Padding(name),
    ),
    endWidget: Padding(name),
  }),
  top: () => CenterBox({
    startWidget: Padding(name),
    centerWidget: VBox([Revealer(name, child, transition), Padding(name)]),
    endWidget: Padding(name),
  }),
  'top-right': () => Box([
    Padding(name),
    VBox({ hexpand: false }, Revealer(name, child, transition), Padding(name)),
  ]),
  'top-center': () => Box([
    Padding(name),
    VBox({ hexpand: false }, Revealer(name, child, transition), Padding(name)),
    Padding(name),
  ]),
  'top-left': () => Box([
    VBox({ hexpand: false }, Revealer(name, child, transition), Padding(name)),
    Padding(name),
  ]),
  'bottom-left': () => Box([
    VBox({ hexpand: false }, Padding(name), Revealer(name, child, transition)),
    Padding(name),
  ]),
  'bottom-center': () => Box([
    Padding(name),
    VBox({ hexpand: false }, Padding(name), Revealer(name, child, transition)),
    Padding(name),
  ]),
  'bottom-right': () => Box([
    Padding(name),
    VBox({ hexpand: false }, Padding(name), Revealer(name, child, transition)),
  ]),
})

export default ({
  name,
  child,
  transition,
  layout = 'center',
  exclusivity = 'ignore',
  ...props
}: RevealerWindowProps) => Window<Gtk.Widget>({
  name,
  exclusivity,
  layer: 'top',
  visible: false,
  keymode: 'on-demand',
  anchor: ['top', 'bottom', 'right', 'left'],
  child: Layout(name, child, transition)[layout](),
  ...props,
}).keybind('Escape', () => App.closeWindow(name))
