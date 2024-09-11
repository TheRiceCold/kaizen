import options from 'options'

import Content from './Content'
import FilterTab from './FilterTab'
import VersesTab from './VersesTab'
import QuestionsTab  from './QuestionsTab'

const { quotes, facts, questions, verses } = options.dashboard.knowledge

export default [
  {
    icon: '󰝗',
    title: 'quotes',
    filterItem: 'name',
    currentValue: Variable(quotes.data.value[0]),
    content: (icon, currentQuote) => Content(
      'quote', icon,
      currentQuote.bind().as(v => v.quote),
      Widget.Label({
        valign: 1,
        className: 'name',
        justification: 'center',
        label: currentQuote.bind().as(v => v.name),
      })
    ),
  },
  {
    icon: '󱍅',
    title: 'facts',
    currentValue: Variable(facts.data.value[0]),
    content: (icon, currentFact) => Content('fact', icon, currentFact.bind().as(v => v.fact)),
  },
  {
    icon: null,
    title: 'questions',
    content: QuestionsTab,
    currentValue: Variable(questions.data.value[0])
  },
  {
    icon: '',
    title: 'verses',
    content: VersesTab,
    filterItem: 'book',
    currentValue: Variable(verses.data.value[0])
  },

  { title: 'filter', content: FilterTab },
]
