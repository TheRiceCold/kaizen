const colorWheel = [
  '#ff6666',
  '#ffff66',
  '#66dd66',
  '#66ffff',
  '#6666ff',
  '#ff66ff',
  '#ff6666',
].join(', ')

export default Widget.Box({
  className: 'range',
  css: `background: linear-gradient(to bottom, ${colorWheel});`,
})
