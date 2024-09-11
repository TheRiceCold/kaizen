import peterson from './peterson'
import dostoevsky from './dostoevsky'

// INFO: I might decide to separate this into new repo
export default [
  ...peterson,
  ...dostoevsky,
  {
    name: 'Carl Jung',
    tags: [ 'wisdom' ],
    quote: "You are what you do, not what you say you'll do.",
  },
  {
    name: 'Carl Jung',
    tags: [ 'wisdom' ],
    quote: 'No tree, it is said, can grow to heaven unless its roots reach down to hell.',
  },
  {
    tags: [ 'motivation' ],
    name: 'Charles Bukowski',
    quote: 'Find what you love and let it kill you.'
  },
  {
    name: 'Socrates',
    tags: [ 'wisdom' ],
    quote: 'Understanding a question is half an answer.'
  },
  {
    name: 'Marcus Aurelius',
    tags: [ 'stoicism', 'wisdom', 'discipline' ],
    quote: 'Be tolerant for others and strict with yourself.',
  },
  {
    name: 'David Allen',
    tags: [ 'education' ],
    quote: 'Your mind is for having ideas, not holding them.'
  },
  {
    name: 'Mike Tyson',
    tags: [ 'discipline' ],
    quote: 'When you are favored by God, you are also favored by the devil.'
  },
  {
    tags: [ 'science' ],
    name: 'Nikola Tesla',
    quote: 'What one man calls God, another calls the laws of physics.',
  },
  {
    tags: [ 'science' ],
    name: 'Nikola Tesla',
    quote: 'If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.',
  },
  {
    name: 'Michell Clark',
    tags: [ 'motivation' ],
    quote: 'Be the person who musters up the courage to believe that a new attempt can manifest a new outcome. Be the person who still tries',
  },
]
