import icons from 'data/icons'
import AccountsService from 'gi://AccountsService?version=1.0'

const {
  iconFile,
  realName,
  userName
} = AccountsService.UserManager.get_default().list_users()[0]

const loggingIn = Variable(false)
const ENV = 'WLR_NO_HARDWARE_CURSORS=1 _JAVA_AWT_WM_NONREPARENTING=1'

async function login(pw: string) {
  loggingIn.value = true
  const greetd = await Service.import('greetd')
  return greetd.login(userName, pw, 'Hyprland', ENV.split(/\s+/)).catch(res => {
    loggingIn.value = false
    response.label = res?.description || JSON.stringify(res)
    password.text = ''
    revealer.revealChild = true
  })
}

const avatar = Widget.Box({
  hpack: 'center',
  className: 'avatar',
  css: `background-image: url('${iconFile}')`,
})

const password = Widget.Entry({
  hexpand: true,
  visibility: false,
  placeholderText: 'Password',
  onAccept: ({ text }) => login(text || ''),
})

const response = Widget.Label({
  wrap: true,
  xalign: 0.5,
  hexpand: true,
  hpack: 'center',
  maxWidthChars: 35,
  className: 'response',
})

const revealer = Widget.Revealer({ transition: 'slide_down' }, response)

export default Widget.Box({
  vertical: true,
  className: 'auth',
  children: [
    Widget.Overlay({
      child: Widget.Box(
        { vertical: true, css: 'min-width: 200px; min-height: 200px;' },
        Widget.Box({
          classname: 'wallpaper',
          css: `background-image: url('${WALLPAPER}')`,
        }),
        Widget.Box({
          vexpand: true,
          className: 'wallpaper-contrast',
        }),
      ),
      overlay: Widget.Box({ vpack: 'end', vertical: true },
        avatar,
        Widget.Box({ hpack: 'center' },
          Widget.Icon(icons.ui.avatar),
          Widget.Label(realName || userName),
        ),
        Widget.Box({ className: 'password' },
          Widget.Spinner({ visible: loggingIn.bind(), active: true }),
          Widget.Icon({ icon: icons.ui.lock, visible: loggingIn.bind().as(b => !b)}),
          password
        )
      )
    }),
    Widget.Box({ className: 'response-box', revealer })
  ]
})
