import options from 'options'

export default Widget.Box({
  hpack: 'center',
  css: `
    background-image: url('${options.avatar}');
    background-position: center;
    background-size: cover;
    min-width: 18em;
    min-height: 18em;
    border: 2px solid;
    border-radius: 999px;`
})
