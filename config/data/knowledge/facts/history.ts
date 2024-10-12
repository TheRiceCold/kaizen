export default [
  {
    tags: [],
    link: '',
    fact: "Did you know Abraham Lincoln is in the wrestling hall of fame? The 6'4\" president had only one loss among his around 300 contests. He earned a reputation for this in New Salem, Illinois, as an elite fighter."
  },
].map(item => ({ tags: ['history', ...item.tags], ...item }))
