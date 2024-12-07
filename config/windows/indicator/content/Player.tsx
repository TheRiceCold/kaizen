import { Gdk, Gtk } from 'astal/gtk3'
import { bind, Variable } from 'astal'
import { EventBoxProps } from 'astal/gtk3/widget'

import Wp from 'gi://AstalWp'
import Mpris from 'gi://AstalMpris'

import icons from 'data/icons'
import options from 'options'

const LABEL_LENGTH = 64

const wp = Wp.get_default()
const mic = wp.defaultSpeaker
const speaker = wp.defaultSpeaker
const player = Mpris.Player.new(options.indicator.preferredPlayer.get())

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
      onScroll={(self: EventBoxProps, event: Gdk.Event) => {
        if (event.direction === Gdk.ScrollDirection.DOWN)
          self.parent.visibleChildName = 'cava'
      }}
    >
      {showVar(show => show ? (
        <box>
          <circularprogress
            child={<Icon />}
            className='progress'
            value={bind(player, 'position').as(p => player.length > 0 ? p / player.length : 0)}
          />
          <label label={labelVar()} />
        </box>) : <box /> )
      }
    </eventbox>
  )
}
