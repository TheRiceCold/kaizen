import GPTService from 'service/api/gpt'
import { setupCursorHover } from 'misc/cursorhover'

import Welcome from './Welcome'
import { ChatEntry } from '../Textbox'
import { ChatMessage } from '../Message'
import icons from 'data/icons'
import options from 'options'

const { Gtk } = imports.gi

const ProviderSwitcher = () => {
  const ProviderChoice = (id, provider) => {
    const providerSelected = Widget.Icon({ icon: 'check-symbolic' })
      .hook(GPTService, self => self.toggleClassName('invisible', GPTService.providerID !== id), 'providerChanged')

    return Widget.Button({
      tooltipText: provider.description,
      onClicked() {
        GPTService.providerID = id
        providerList.revealChild = false
        indicatorChevron.icon = icons.ui.arrow.down
      },
      child: Widget.Box([
        Widget.Icon(provider.logoName),
        Widget.Label({ xalign: 0, hexpand: true, label: provider.name }),
        providerSelected,
      ]),
      setup: setupCursorHover,
    })
  }

  const indicatorChevron = Widget.Icon(icons.ui.arrow.down)
  const indicatorButton = Widget.Button({
    tooltipText: 'Select ChatGPT-compatible API provider',
    child: Widget.Box([
      Widget.Icon('cloud-symbolic'),
      Widget.Label({
        xalign: 0,
        hexpand: true,
        label: GPTService.providerID,
      }).hook(
        GPTService,
        (self) =>
          (self.label = `${GPTService.providers[GPTService.providerID]['name']}`),
        'providerChanged',
      ),
      indicatorChevron,
    ]),
    onClicked() {
      providerList.revealChild = !providerList.revealChild
      indicatorChevron.icon = providerList.revealChild
        ? icons.ui.arrow.up
        : icons.ui.arrow.down
    },
    setup: setupCursorHover,
  })

  const providerList = Widget.Revealer({
    revealChild: false,
    transition: 'slide_down',
    transitionDuration: options.transition,
    child: Widget.Box({
      vertical: true,
      className: 'sidebar-chat-providerswitcher-list',
      children: [
        Widget.Box({ className: 'separator-line' }),
        Widget.Box({ vertical: true }).hook(
          GPTService,
          (self) => {
            self.children = Object.entries(GPTService.providers).map(
              ([id, provider]) => ProviderChoice(id, provider),
            )
          },
          'initialized',
        ),
      ],
    }),
  })
  return Widget.Box({
    hpack: 'center',
    vertical: true,
    className: 'sidebar-chat-providerswitcher',
    children: [indicatorButton, providerList],
  })
}

export const chatContent = Widget.Box({ vertical: true }).hook(
  GPTService,
  (box, id) => {
    const message = GPTService.messages[id]
    if (!message) return
    box.add(
      ChatMessage(
        message,
        `Model (${GPTService.providers[GPTService.providerID]['name']})`,
      ),
    )
  },
  'newMsg',
)

export default Widget.Box(
  { vertical: true },
  ProviderSwitcher(),
  Widget.Scrollable({
    vexpand: true,
    className: 'sidebar-chat-viewport',
    child: Widget.Box({ vertical: true }, Welcome, chatContent),
    setup(scrolledWindow) {
      // Show scrollbar
      scrolledWindow.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC)
      const vScrollbar = scrolledWindow.get_vscrollbar()
      vScrollbar.get_style_context().add_class('sidebar-scrollbar')
      // Avoid click-to-scroll-widget-to-view behavior
      Utils.timeout(1, () => {
        const viewport = scrolledWindow.child
        viewport.set_focus_vadjustment(new Gtk.Adjustment(undefined))
      })
      // Always scroll to bottom with new content
      const adjustment = scrolledWindow.get_vadjustment()
      adjustment.connect('changed', () => {
        if (!ChatEntry.hasFocus) return
        adjustment.set_value(
          adjustment.get_upper() - adjustment.get_page_size(),
        )
      })
    },
  }),
)
