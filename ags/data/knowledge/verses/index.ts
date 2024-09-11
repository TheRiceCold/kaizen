const proverbs = [
  {
    verse: '9:10',
    tags: [ 'wisdom' ],
    content: 'The fear of the Lord is the beginning of wisdom: and the knowledge of the holy is understanding.'
  },
].map(verse => ({ book: 'Proverbs', ...verse }))

const matthew = [
  {
    verse: '16:24',
    tags: [ 'christ' ],
    content: 'Then said Jesus unto his disciples, If any man will come after me, let him deny himself, and take up his cross, and follow me.',
  },
].map(verse => ({ book: 'Matthew', ...verse }))

const john = [
  {
    verse: '8:31',
    tags: [ 'truth' ],
    content: 'Then said Jesus to those Jews which believed on him, If ye continue in my word, then are ye my disciples indeed'
  },
  {
    verse: '8:32',
    tags: [ 'truth' ],
    content: 'And ye shall know the truth, and the truth shall make you free.'
  },
].map(verse => ({ book: 'John', ...verse }))

export default [
  ...john,
  ...matthew,
  ...proverbs,
]
