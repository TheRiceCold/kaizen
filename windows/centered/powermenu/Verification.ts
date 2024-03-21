import CenteredWindow from '../PopupWindow'
import powermenu from 'service/powermenu'

export default CenteredWindow({
  name: 'verification',
  transition: 'crossfade',
  child: Widget.Box({
    vertical: true,
    className: 'verification',
    children: [
      Widget.Box({
        className: 'text-box',
        vertical: true,
        children: [
          Widget.Label({ className: 'title', label: powermenu.bind('title') }),
          Widget.Label({ className: 'desc', label: 'Are you sure?' }),
        ],
      }),
      Widget.Box({
        vpack: 'end',
        vexpand: true,
        homogeneous: true,
        className: 'buttons horizontal',
        children: [
          Widget.Button({
            label: 'No',
            onClicked: () => App.toggleWindow('verification'),
            setup: self => self.hook(App, (_, name: string, visible: boolean) => {
              if (name === 'verification' && visible)
                self.grab_focus()
            }),
          }),
          Widget.Button({
            label: 'Yes',
            onClicked: () => Utils.exec(powermenu.cmd),
          }),
        ],
      }),
    ],
  }),
})
