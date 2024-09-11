import Content from './Content'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const ChoicesButton = (label, index) => Widget.Button({
  xalign: 0,
  cursor: 'pointer',
  label: `${alphabet[index]}. ${label}`
})

export default (icon, currentQuestion) => Content(
  'questions', icon,
  currentQuestion.bind().as(v => v.question),
  Widget.Box({
    vpack: 'end',
    vertical: true,
    className: 'choices',
    children: currentQuestion.bind().as(q => q.choices.map(ChoicesButton))
  })
)
