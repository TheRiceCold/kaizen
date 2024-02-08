import { icons, services } from '../../../../../../constants/main.js'
import { sorm, iconSubstitute } from './exports.js'

const { Audio } = services
const sorms = type => type === 'sink' ? 'speakers' : 'microphones'

const Item = type => stream => Widget.Button({
  onClicked: () => Audio[sorm(type)] = stream,
  child: Widget.Box({
    children: [
      Widget.Icon({
        tooltipText: stream.icon_name,
        icon: iconSubstitute(stream.icon_name, type),
      }),
      Widget.Label(stream.description?.split(' ').slice(0, 4).join(' ')),
      Widget.Icon({
        hpack: 'end',
        hexpand: true,
        icon: 'object-select-symbolic'
      }).hook(Audio, icon => {
        icon.visible = Audio[sorm(type)] === stream
      })
    ]
  })
})

export default (type = 'sink') => Widget.Box({
  vertical: true,
  children: [
    Widget.Box({
      children: [
        Widget.Icon(type === 'sink' ? icons.audio.type.headset : icons.audio.mic.unmuted),
        Widget.Label(type + 'Selector'),
      ]
    }),
    Widget.Separator({ }),
    Widget.Box({
      vertical: true,
      children: [
        Widget.Box({ vertical: true })
        .hook(Audio, box => {
          box.children = Array.from(Audio[sorms(type)].values()).map(Item(type))
        }, 'stream-added')
        .hook(Audio, box => {
          box.children = Array.from(Audio[sorms(type)].values()).map(Item(type))
        }, 'stream-removed')
      ]
    })
  ]
})
