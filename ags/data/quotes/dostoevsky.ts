const tbk = [
  {
    tags: [ 'wisdom', 'love' ],
    book: 'The Brothers Karamazov',
    quote: 'To love someone means to see them as God intended them.',
  },
  {
    tags: [ 'wisdom' ],
    book: 'The Brothers Karamazov',
    quote: 'Every man is not only responsible for everything he does, but for everything everyone else does.'
  },
  {
    book: 'The Brothers Karamazov',
    tags: [ 'discipline', 'wisdom' ],
    quote: "Above all, don't lie to your yourself. A man who lies to himself and listens to his own lie comes to a point where he does not discern any truth."
  },
  {
    tags: [ 'wisdom', 'love' ],
    book: 'The Brothers Karamazov',
    quote: 'Love all God’s creation, both the whole and every grain of sand. Love every leaf, every ray of light. Love the animals, love the plants, love each separate thing.'
  },
]

export default [
  ...tbk,
  {
    tags: [ 'life' ],
    book: 'The Idiot',
    quote: 'Beauty will save the world.'
  },
  {
    tags: [ 'wisdom', 'divine' ],
    quote: 'Without God all things are permitted',
  },
  {
    book: 'White Knights',
    tags: [ 'life', 'motivation' ],
    quote: 'But how could you live and have no story to tell?',
  },
  {
    book: 'Demons',
    tags: [ 'discipline', 'motivation' ],
    quote: 'If you want to overcome the whole world, overcome yourself.'
  },
  {
    tags: [ 'discipline' ],
    book: 'Crime and Punishment',
    quote: 'Your worst sin is that you have destroyed and betrayed yourself for nothing.'
  },
  {
    tags: [ 'discipline', 'motivation' ],
    book: 'The Insulted and Humilated',
    quote: 'If you want to be respected by others, the great thing is to respect yourself. Only by that, only by self-respect will you compel others to respect you.'
  },
].map(item => ({ name: 'Fyodor Dostoevsky', ...item }))
