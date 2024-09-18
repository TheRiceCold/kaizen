import { type Stream } from 'types/service/audio'
import ListRevealer from '../ListRevealer'

const audio = await Service.import('audio')

function streamIconSubstitute(stream: Stream) {
  const subs = { 'spotify': 'spotify', 'Firefox': 'firefox' }
  return subs[stream.name] || stream.icon_name
}

const MixerItem = (stream: Stream) => Widget.Box(
  { hexpand: true, className: 'mixer-item' },
  Widget.Icon()
    .bind('tooltipText', stream, 'name', (name: string) => name || '')
    .bind('icon', stream, 'icon_name', () => streamIconSubstitute(stream)),
  Widget.Box({
    vertical: true,
    vpack: 'center',
    className: 'slider-box'
  }, Widget.Box([
    Widget.Label({
      xalign: 0,
      hexpand: true,
      truncate: 'end',
    }).bind('label', stream, 'description', (desc: string) => desc || ''),
    Widget.Label({xalign: 0}).bind('label', stream, 'volume', (vol: number) => Math.floor(vol * 100)+'%'),
  ]),
  Widget.Slider({
    hexpand: true,
    drawValue: false,
    value: stream.bind('volume'),
    onChange({ value }) { stream.volume = value },
  }))
)

export default ListRevealer('App Mixer',
  Widget.Box({vertical: true}).bind(
    'children', audio, 'apps',
    ((a: Stream[]) => a.map(MixerItem))
  )).bind('visible', audio, 'apps', (a: Stream[]) => a.length > 0)
