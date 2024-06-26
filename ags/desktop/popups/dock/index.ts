import PinnedApps from './PinnedApps'
import Taskbar from './Taskbar'
import options from 'options'

let timers = []
let isPinned = false
function clearTimes() {
  timers.forEach(e => imports.gi.GLib.source_remove(e))
  timers = []
}
const { dock } = options.popups
const hyprland = await Service.import('hyprland')

const Content = Widget.Box(
  { className: 'dock-bg' },
  Widget.Button({
    cursor: 'pointer',
    className: 'app-btn',
    child: Widget.Icon('pin-symbolic'),
    onClicked() { isPinned = !isPinned }
  }),
  PinnedApps,
  Widget.Separator({ vertical: true }),
  Taskbar,
)

const Revealer = Widget.Revealer({
  child: Content,
  revealChild: false,
  transition: 'slide_up',
  transitionDuration: options.transition,
  attribute: {
    updateShow(self) {
      self.revealChild = true
      return self.revealChild
    }
  },
  setup(self) {
    function callback(self, trigger) {
      if (!dock.trigger.includes(trigger)) return
      const flag = self.attribute.updateShow(self)

      if (flag) clearTimes()

      const id = Utils.timeout(options.transition, () => {
        if (!isPinned) self.revealChild = false
        timers = timers.filter(e => e !== id)
      })
      timers.push(id)
    }

    self
      .hook(hyprland.active.workspace, self => callback(self, 'workspace-active'))
      .hook(hyprland.active.client, self => callback(self, 'client-active'))
      .hook(hyprland, self => callback(self, 'client-added'), 'client-added')
      .hook(hyprland, self => callback(self, 'client-removed'), 'client-removed')
  },
})

export default Widget.EventBox({
  child: Revealer,
  css: 'min-height: 4px;',
  onHover() {
    Revealer.revealChild = true
    clearTimes()
  },
}).on('leave-notify-event', () => {
  if (!isPinned) Revealer.revealChild = false
  clearTimes()
})
