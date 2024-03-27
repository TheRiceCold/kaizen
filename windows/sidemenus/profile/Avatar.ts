import options from 'options'

const { image, size } = options.sideright.profile.avatar

export default Widget.Box({
  className: 'avatar',
  css: Utils.merge(
    [ image.bind(), size.bind() ], (img, size) => `
    min-width: ${size}px;
    min-height: ${size}px;
    background-image: url('${img}');
    background-size: cover;`),
})
