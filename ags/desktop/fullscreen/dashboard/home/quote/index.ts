import data from 'data/quotes'

const getRandom = () => data[Math.floor(Math.random() * data.length)]
const quote = Variable(data[0], { poll: [900000, getRandom] })

export default Widget.Box(
  { vertical: true, className: 'quote' },
  Widget.Button({
    xalign: 1,
    label: '',
    cursor: 'pointer',
    onClicked() { quote.value = getRandom() }
  }),
  Widget.Label({
    label: '󰝗',
    vpack: 'center',
    className: 'icon',
  }),
  Widget.Label({
    wrap: true,
    className: 'text',
    maxWidthChars: 40,
    justification: 'center',
    label: quote.bind().as(v => v.text),
  }),
  Widget.Label({
    valign: 1,
    className: 'name',
    justification: 'center',
    label: quote.bind().as(v => v.name),
  })
)
