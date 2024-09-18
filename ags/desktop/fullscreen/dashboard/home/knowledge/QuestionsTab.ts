import { ButtonLabel } from 'widgets'
import Content from './Content'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
export default (icon: string, currentQuestion) => Content(
  'questions', icon,
  currentQuestion.bind().as(v => v.question),
  Widget.Box({
    vpack: 'end',
    vertical: true,
    className: 'choices',
    children: currentQuestion.bind()
      .as(q => q.choices.map(( label: string, i: number) => ButtonLabel(
        `${alphabet[i]}. ${label}`, () => {

        }, { xalign: 0 },
      )))
  })
)
