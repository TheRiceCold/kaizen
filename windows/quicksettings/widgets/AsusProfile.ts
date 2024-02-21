import { ArrowToggleButton, Menu } from '../ToggleButton'
import icons from 'lib/icons'
import asusctl from 'service/asusctl'

const profile = asusctl.bind('profile')

export const ProfileToggle = () => ArrowToggleButton({
  name: 'asusctl-profile',
  label: profile,
  activate: () => asusctl.setProfile('Quiet'),
  deactivate: () => asusctl.setProfile('Balanced'),
  icon: profile.as(p => icons.asusctl.profile[p]),
  connection: [ asusctl, () => asusctl.profile !== 'Balanced' ],
  activateOnArrow: false,
})

export const ProfileSelector = () => Menu({
  name: 'asusctl-profile',
  title: 'Profile Selector',
  icon: profile.as(p => icons.asusctl.profile[p]),
  content: [
    Widget.Box({
      vertical: true,
      hexpand: true,
      children: [
        Widget.Box({
          vertical: true,
          children: asusctl.profiles.map(prof => Widget.Button({
            onClicked: () => asusctl.setProfile(prof),
            child: Widget.Box({
              children: [
                Widget.Icon(icons.asusctl.profile[prof]),
                Widget.Label(prof),
              ],
            }),
          })),
        }),
      ],
    }),
    Widget.Separator(),
    Widget.Button({
      onClicked: () => Utils.execAsync('rog-control-center'),
      child: Widget.Box({
        children: [
          Widget.Icon(icons.ui.settings),
          Widget.Label('Rog Control Center'),
        ],
      }),
    }),
  ],
})
