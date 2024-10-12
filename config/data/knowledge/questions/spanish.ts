export default [
  { answer: '¿Dónde vives?', question: 'Where do live?' },
  { answer: '¿Que pasa?', question: 'What\'s happening?' },
  { answer: '¿Cuánto cuesta?', question: 'How much is this?' },
  { answer: '¿Que hora tienes?', question: 'What time is it?' },
  { answer: '¿Como te llamas?', question: 'What is your name?' },
  { answer: '¡Que tenga un lindo dia!', question: 'Have a nice day!' },
  { answer: '¡Que tenga un lindo dia!', question: 'Can you speak slowly?' },
  { answer: 'Llámame cuando llegues', question: 'Call me when you arrive' },
].map(item => ({
  question: `Translate in spanish: "${item.question}"`,
  tags: ['spanish'],
  ...item
}))
