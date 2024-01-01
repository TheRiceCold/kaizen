import { Widget, Mpris } from '../../../imports.js'
import * as mpris from '../../../misc/mpris.js'
import options from '../../../options.js'

const Footer = player => Widget.CenterBox({
  className: 'footer-box',
  children: [
    Widget.Box({
      className: 'position',
      children: [
        mpris.PositionLabel(player),
        mpris.Slash(player),
        mpris.LengthLabel(player),
      ],
    }),
    Widget.Box({
      className: 'controls',
      children: [
        mpris.ShuffleButton(player),
        mpris.PreviousButton(player),
        mpris.PlayPauseButton(player),
        mpris.NextButton(player),
        mpris.LoopButton(player),
      ],
    }),
    mpris.PlayerIcon(player, { symbolic: false, hexpand: true, hpack: 'end' }),
  ],
})

const TextBox = player => Widget.Box({
  children: [
    mpris.CoverArt(player, { hpack: 'end', hexpand: false }),
    Widget.Box({
      hexpand: true,
      vertical: true,
      className: 'labels',
      children: [
        mpris.TitleLabel(player, { xalign: 0, justification: 'left', wrap: true }),
        mpris.ArtistLabel(player, { xalign: 0, justification: 'left', wrap: true }),
      ],
    }),
  ],
})

const PlayerBox = player => Widget.Box({
  className: `player ${player.name}`,
  child: mpris.BlurredCoverArt(player, {
    hexpand: true,
    child: Widget.Box({
      hexpand: true,
      vertical: true,
      children: [
        TextBox(player),
        mpris.PositionSlider(player),
        Footer(player),
      ],
    }),
  }),
})

export default () => Widget.Box({
  vertical: true,
  className: 'media vertical',
  connections: [['draw', self => {
    self.visible = Mpris.players.length > 0
  }]],
  binds: [[
    'children', 
    Mpris, 
    'players', 
    ps => ps.filter(p => !options.mpris.black_list.value.includes(p.identity)).map(PlayerBox)
  ]],
})
