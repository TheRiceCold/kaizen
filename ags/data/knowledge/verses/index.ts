const proverbs = [
  {
    verse: '9:10',
    tags: [ 'wisdom' ],
    content: 'The fear of the Lord is the beginning of wisdom: and the knowledge of the holy is understanding.'
  },
  {
    verse: '30:4',
    tags: [ 'christ' ],
    content: 'Who hath ascended up into heaven, or descended? who hath gathered the wind in his fists? who hath bound the waters in a garment? who hath established all the ends of the earth? what is his name, and what is his son\'s name, if thou canst tell?'
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
