import options from 'options'

export default Widget.Box({
  vpack: 'end',
  hpack: 'start',
  className: 'avatar',
  css: options.avatar.bind().as(
    (img: string) => `
    min-width: 125px;
    min-height: 125px;
    background-size: cover;
    background-image: url('${img}');`,
  ),
})
