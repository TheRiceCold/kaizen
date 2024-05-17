import options from 'options'
import { windows, lock } from './main'

const { scheme } = options.theme
const { image } = options.sideright.profile.avatar
const primaryBg = options.theme[scheme].primary.bg
const bgImage = `${Utils.HOME}/.config/background`

function unlock() {
  for (const win of windows)
    win.window.child.children[0].revealChild = false

  Utils.timeout(500, () => {
    lock.unlock_and_destroy()
    windows.forEach(w => w.window.destroy())
    imports.gi.Gdk.Display.get_default()?.sync()
    App.quit()
  })
}

const LoginBox = Widget.Box({
  spacing: 16,
  vertical: true,
  vpack: 'center',
  hpack: 'center',
  children: [
    Widget.Box({ 
      hpack: 'center', 
      css: `
        background-image: url('${image}');
        background-position: center;
        background-size: cover;
        border: 4px solid ${primaryBg};
        border-radius: 999px;
        min-height: 15em;
        min-width: 15em;`
    }),
    Widget.Entry({
      xalign: 0.5,
      hpack: 'center',
      visibility: false,
      css: `
      font-size: 2em; 
      min-width: 350px; 
      border-radius: 1em;`,
      placeholderText: 'password',
      onAccept(self) {
        self.sensitive = false
        Utils.authenticate(self.text ?? '')
          .then(() => unlock())
          .catch(e => {
            self.text = ''
            self.parent.children[0].label = e.message
            self.sensitive = true
          })
      }
    }).on('realize', entry => entry.grab_focus()),
  ]
})

export default Widget.Box(
  {  hpack: 'center', vpack: 'center' },
  Widget.Revealer({
    revealChild: false,
    transition: 'crossfade',
    transitionDuration: 500,
    child: Widget.Box(
      { 
        vertical: true,
        css: `
          background-image: url('${bgImage}');
          background-position: center;
          background-size: cover;`
      },
      LoginBox,
    )
  }).on('realize', self => Utils.idle(() => self.revealChild = true))
)

