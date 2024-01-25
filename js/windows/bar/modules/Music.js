import { Utils, Widget, Mpris } from '../../../imports.js'
import { AnimatedCircularProgress } from '../../../misc/main.js'
import { variables, utils } from '../../../constants/main.js'

const { showMusicControls } = variables

const trimTrackTitle = title => title.replace(/【[^】]*】/, '').trim()

const TrackProgress = () => {
  const _updateProgress = circprog => {
    const mpris = Mpris.getPlayer('')
    if (!mpris) return
    circprog.css = `font-size: ${Math.max(mpris.position / mpris.length * 100, 0)}px;`
  }

  return AnimatedCircularProgress({
    className: 'bar-music-circprog',
    vpack: 'center', hpack: 'center',
    connections: [ // Update on change/once every 3 seconds
      [Mpris, _updateProgress],
      [3000, _updateProgress]
    ]
  })
}

export default Widget.EventBox({
  onScrollUp: () => Utils.execAsync('hyprctl dispatch workspace -1'),
  onScrollDown: () => Utils.execAsync('hyprctl dispatch workspace +1'),
  onPrimaryClickRelease: () => showMusicControls.setValue(!showMusicControls.value),
  onSecondaryClickRelease: () => utils.execBash('playerctl next || playerctl position `bc <<< "100 * $(playerctl metadata mpris:length) / 1000000 / 100"` &'),
  onMiddleClickRelease: () => Mpris.getPlayer('')?.playPause(),
  child: Widget.Box({
    className: 'bar-group-margin bar-sides',
    children: [
      Widget.Box({
        className: 'bar-group bar-group-standalone bar-group-pad-music spacing-h-10',
        children: [
          Widget.Box({ // Wrap a box cuz overlay can't have margins itself
            homogeneous: true,
            children: [Widget.Overlay({
              child: Widget.Box({
                vpack: 'center',
                className: 'bar-music-playstate',
                homogeneous: true,
                children: [Widget.Label({
                  vpack: 'center',
                  justification: 'center',
                  className: 'bar-music-playstate-txt',
                  connections: [[Mpris, label => {
                    const mpris = Mpris.getPlayer('')
                    label.label = `${mpris !== null && mpris.playBackStatus == 'Playing' ? '' : ''}`
                  }]],
                })],
                connections: [[Mpris, label => {
                  const mpris = Mpris.getPlayer('')
                  if (!mpris) return
                  label.toggleClassName('bar-music-playstate-playing', mpris !== null && mpris.playBackStatus == 'Playing')
                  label.toggleClassName('bar-music-playstate', mpris !== null || mpris.playBackStatus == 'Paused')
                }]],
              }),
              overlays: [TrackProgress()]
            })]
          }),

          Widget.Label({
            className: 'txt-smallie',
            connections: [[Mpris, label => {
              const mpris = Mpris.getPlayer('')
              label.label = mpris ? `${trimTrackTitle(mpris.trackTitle)} • ${mpris.trackArtists.join(', ')}` : 'No media'
            }]]
          })
        ]
      })
    ]
  })
})
