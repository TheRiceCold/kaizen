import options from 'options'

export default ({ icon, ...props }) => Widget.Revealer({
  revealChild: false,
  transition: 'slide_right',
  attribute: { workspace: 0 },
  transitionDuration: options.transition,
  child: Widget.Button({
    ...props,
    cursor: 'pointer',
    className: 'app-btn app-btn-animate',
    child: Widget.Box({
      child: Widget.Overlay({
        child: Widget.Box({
          homogeneous: true,
          className: 'app-icon',
          child: Widget.Icon({ icon }),
        }),
        overlay: Widget.Box({
          vpack: 'end',
          hpack: 'center',
          className: 'indicator',
        }),
      }),
    }),
  })
})
