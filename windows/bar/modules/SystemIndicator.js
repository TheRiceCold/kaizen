import { 
  App, 
  Audio, 
  Widget, 
  Network,
  Bluetooth, 
  Notifications, 
} from '../../../imports.js'
import { FontIcon, HoverRevealer } from '../../../misc/main.js'
import PanelButton from './PanelButton.js'
// import Asusctl from '../../services/asusctl.js'
import Indicator from '../../../services/onscreenindicator.js'
import icons from '../../../icons.js'

// const ProfileIndicator = () => FontIcon()
//   .bind('visible', Asusctl, 'profile', p => p !== 'Balanced')
//   .bind('icon', Asusctl, 'profile', i => icons.asusctl.profile[i])

// const ModeIndicator = () => FontIcon()
//   .bind('visible', Asusctl, 'mode', m => m !== 'Hybrid')
//   .bind('icon', Asusctl, 'mode', i => icons.asusctl.mode[i])

const MicrophoneIndicator = FontIcon().hook(Audio, icon => {
  if (!Audio.microphone) return

  if (Audio.microphone.is_muted)
    return icon.icon = icons.mic.muted

  const cons = [
    [65, ''], [35, ''], [1, ''], [0, '']
  ]
  icon.icon = cons.find(([n]) => n <= Audio.microphone.volume * 100)?.[1] || ''

  icon.visible = Audio.recorders.length > 0 || Audio.microphone.is_muted
}, 'speaker-changed')

// const DNDIndicator = () => FontIcon({
//   visible: Notifications.bind('dnd'),
//   icon: icons.notifications.silent,
// })

const BluetoothDevicesIndicator = Widget.Box().hook(Bluetooth, box => {
  box.children = Bluetooth.connectedDevices
    .map(({ iconName, name }) => HoverRevealer({
      indicator: FontIcon(iconName + '-symbolic'),
      child: Widget.Label(name),
    }))

  box.visible = Bluetooth.connectedDevices.length > 0
}, 'notify::connected-devices')

// const BluetoothIndicator = () => FontIcon({
//   icon: icons.bluetooth.enabled,
//   className: 'bluetooth',
//   visible: Bluetooth.bind('enabled'),
// })

const NetworkIndicator = FontIcon().hook(Network, self => {
  // const icon = Network[Network.primary || 'wifi']?.iconName
  const icon = '󰖩' 
  self.icon = icon
  self.visible = !!icon
})

const AudioIndicator = FontIcon().hook(Audio, self => {
  if (!Audio.speaker) return

  const { high, medium, low, muted } = icons.audio.volume

  if (Audio.speaker.is_muted) 
    return self.icon = '󰝟'

  const cons = [[65, high], [35, medium], [1, low], [0, muted]]
  self.icon = cons.find(([n]) => n <= Audio.speaker.volume * 100)?.[1] || ''
}, 'speaker-changed')

export default PanelButton({
  className: 'quicksettings panel-button',
  onClicked: () => App.toggleWindow('quicksettings'),
  setup: self => self.hook(App, (_, win, visible) => {
    self.toggleClassName('active', win === 'quicksettings' && visible)
  }),
  onScrollUp: () => {
    Audio.speaker.volume += 0.02
    Indicator.speaker()
  },
  onScrollDown: () => {
    Audio.speaker.volume -= 0.02
    Indicator.speaker()
  },
  content: Widget.Box({
    children: [
      // Asusctl?.available && ProfileIndicator(),
      // Asusctl?.available && ModeIndicator(),
      // DNDIndicator(),
      BluetoothDevicesIndicator,
      // BluetoothIndicator(),
      NetworkIndicator,
      AudioIndicator,
      MicrophoneIndicator,
    ],
  }),
})
