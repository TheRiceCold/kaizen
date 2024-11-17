import { bind, Variable } from 'astal'
import { Gtk } from 'astal/gtk3'
import icons from 'data/icons'
import { capitalize } from 'utils'

import Wp from 'gi://AstalWp'

export default({ type }: { type: 'speaker' | 'microphone' }) => {
  const device = Wp.get_default()[`default${capitalize(type)}`]
  const volume = bind(device, 'volume')

  const iconVar = Variable.derive(
    [bind(device, 'volume-icon'), bind(device, 'volume'), bind(device, 'mute')],
    (icon, volume, mute) => mute || volume <= 0 ? icons.audio.volume.muted : icon
  )
  const labelVar = Variable.derive(
    [bind(device, 'volume'), bind(device, 'mute')],
    (volume, mute) => mute || volume <= 0 ? 'Muted' : Math.round(volume * 100)+'%'
  )

  return (
    <box name={type} halign={Gtk.Align.CENTER}>
      <circularprogress
        className='progress'
        value={volume.as(v => v < 1 ? v : 1)}
        child={<icon className='icon' icon={iconVar()} />}
        setup={self => self
          .hook(device, 'notify::mute', () => self.toggleClassName('limit', device.mute))
          .hook(device, 'notify::volume', () => self.toggleClassName('limit', device.volume > 1.1 || device.volume <= 0))
        }
      />
      <label label={labelVar()} />
    </box>
  )
}
