import { Gtk } from 'astal/gtk3'
import { bind, Variable } from 'astal'

import Wp from 'gi://AstalWp'
import Mpris from 'gi://AstalMpris'

import icons from 'data/icons'

const LABEL_LENGTH = 64

const wp = Wp.get_default()
const mic = wp.defaultSpeaker
const speaker = wp.defaultSpeaker
const player = Mpris.Player.new('spotify')

const labelVar: Variable<string> = Variable.derive(
  [ bind(player, 'artist'), bind(player, 'title') ],
  (artist, title) => `${artist} - ${title}`.substring(0, LABEL_LENGTH)
)
const showVar: Variable<boolean> = Variable.derive(
  [ bind(player, 'available'), bind(speaker, 'mute'), bind(mic, 'mute') ],
  (available, speakerMuted, micMuted) =>
    (available && !speakerMuted) || (available && !micMuted)
)

export default () => {
  const Icon = () => (
    <icon
      className='icon'
      icon={bind(player, 'playback-status')
        .as((status) => status === Mpris.PlaybackStatus.PLAYING
          ? icons.mpris.playing
          : icons.mpris.paused)}
    />
  )

  return (
    <eventbox
      name='player'
      halign={Gtk.Align.CENTER}
      onClick={() => player.play_pause()}
      onScroll={self => self.parent.visibleChildName = 'cava'}
      child={showVar(show => show ? (
        <box>
          <circularprogress
            child={<Icon />}
            className='progress'
            value={bind(player, 'position').as(p => player.length > 0 ? p / player.length : 0)}
          />
          <label label={labelVar()} />
        </box>) : <box /> )
      }
    />
  )
}
