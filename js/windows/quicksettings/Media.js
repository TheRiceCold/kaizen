import { services, options } from '../../constants/main.js'
import { mpris } from '../../misc/main.js';

const Footer = player => Widget.CenterBox({
  className: 'footer-box',
  startWidget: Widget.Box({
    className: 'position',
    children: [
      mpris.PositionLabel(player),
      mpris.Slash(player),
      mpris.LengthLabel(player),
    ],
  }),
  center_widget: Widget.Box({
    className: 'controls',
    children: [
      mpris.ShuffleButton(player),
      mpris.PreviousButton(player),
      mpris.PlayPauseButton(player),
      mpris.NextButton(player),
      mpris.LoopButton(player),
    ],
  }),
  endWidget: mpris.PlayerIcon(player, {
    symbolic: false,
    hexpand: true,
    hpack: 'end',
  }),
})

const TextBox = player => Widget.Box({
  children: [
    mpris.CoverArt(player, {
      hpack: 'end',
      hexpand: false,
    }),
    Widget.Box({
      hexpand: true,
      vertical: true,
      class_name: 'labels',
      children: [
        mpris.TitleLabel(player, {
          xalign: 0,
          wrap: true,
          justification: 'left',
        }),
        mpris.ArtistLabel(player, {
          xalign: 0,
          wrap: true,
          justification: 'left',
        }),
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
        mpris.PositionSlide(player),
        Footer(player)
      ]
    })
  })
})

export default () => Widget.Box({
  vertical: true,
  className: 'media vertical',
  visible: services.Mpris.bind('players').transform(p => p.length > 0),
  children: services.Mpris.bind('players').transform(ps => ps.filter(p => !options.mpris.black_list.value.includes(p.identity)).map(PlayerBox))
})
