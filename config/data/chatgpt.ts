type TMessage = {
  content: string,
  role: 'user' | 'assistant',
}

export const providers = { // There's this list hmm https://github.com/zukixa/cool-ai-stuff/
  openai: {
    name: 'OpenAI',
    logoName: 'gpt-symbolic',
    description: 'Official OpenAI API.\nPricing: Free for the first $5 or 3 months, whichever is less.',
    baseUrl: 'https://api.openai.com/v1/chat/completions',
    keyGetUrl: 'https://platform.openai.com/api-keys',
    keyFile: 'openai_key.txt',
    model: 'gpt-3.5-turbo',
  },
  ollama: {
    name: 'Ollama (Llama 3)',
    logoName: 'ollama-symbolic',
    description: 'Official Ollama API.\nPricing: Free.',
    baseUrl: 'http://localhost:11434/v1/chat/completions',
    keyGetUrl: 'it\'s just ollama',
    keyFile: 'ollama_key.txt',
    model: 'llama3:instruct',
  },
  openrouter: {
    name: 'OpenRouter (Llama-3-70B)',
    logoName: 'openrouter-symbolic',
    description: 'A unified interface for LLMs',
    baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
    keyGetUrl: 'https://openrouter.ai/keys',
    keyFile: 'openrouter_key.txt',
    model: 'meta-llama/llama-3-70b-instruct',
  },
  oxygen4o: {
    name: 'Oxygen (GPT-4o)',
    logoName: 'oxygen-symbolic',
    description: 'An API from Tornado Softwares\nPricing: Free: 100/day\nRequires you to join their Discord for a key',
    baseUrl: 'https://app.oxyapi.uk/v1/chat/completions',
    keyGetUrl: 'https://discord.com/invite/kM6MaCqGKA',
    keyFile: 'oxygen_key.txt',
    model: 'gpt-4o',
  },
  oxygen3: {
    name: 'Oxygen (GPT-3.5)',
    logoName: 'oxygen-symbolic',
    description: 'An API from Tornado Softwares\nPricing: Free: 100/day\nRequires you to join their Discord for a key',
    baseUrl: 'https://app.oxyapi.uk/v1/chat/completions',
    keyGetUrl: 'https://discord.com/invite/kM6MaCqGKA',
    keyFile: 'oxygen_key.txt',
    model: 'gpt-3.5-turbo',
  },
  zukijourney: {
    name: 'zukijourney (GPT-3.5)',
    logoName: 'ai-zukijourney',
    description: 'An API from @zukixa on GitHub.\nNote: Keys are IP-locked so it\'s buggy sometimes\nPricing: Free: 10/min, 800/day.\nRequires you to join their Discord for a key',
    baseUrl: 'https://zukijourney.xyzbot.net/v1/chat/completions',
    keyGetUrl: 'https://discord.com/invite/Y4J6XXnmQ6',
    keyFile: 'zuki_key.txt',
    model: 'gpt-3.5-turbo',
  },
}

export const initMessages: TMessage[] = [
  {
    role: 'user',
    content: "You are an assistant on a sidebar of a Wayland Linux desktop. Please always use a casual tone when answering your questions, unless requested otherwise or making writing suggestions. These are the steps you should take to respond to the user's queries:\n1. If it's a writing- or grammar-related question or a sentence in quotation marks, Please point out errors and correct when necessary using underlines, and make the writing more natural where appropriate without making too major changes. If you're given a sentence in quotes but is grammatically correct, explain briefly concepts that are uncommon.\n2. If it's a question about system tasks, give a bash command in a code block with brief explanation.\n3. Otherwise, when asked to summarize information or explaining concepts, you are should use bullet points and headings. For mathematics expressions, you *have to* use LaTeX within a code block with the language set as \"latex\". \nNote: Use casual language, be short, while ensuring the factual correctness of your response. If you are unsure or don’t have enough information to provide a confident answer, simply say “I don’t know” or “I’m not sure.”. \nThanks!",
  },
  { role: 'assistant', content: '- Got it!' },
  {
    role: 'user',
    content: "\"He rushed to where the event was supposed to be hold, he didn't know it got canceled\""
  },
  {
    role: 'assistant',
    content: "## Grammar correction\nErrors:\n\"He rushed to where the event was supposed to be __hold____,__ he didn't know it got canceled\"\nCorrection + minor improvements:\n\"He rushed to the place where the event was supposed to be __held____, but__ he didn't know that it got canceled\""
  },
  { role: 'user', content: 'raise volume by 5%' },
  {
    role: 'assistant',
    content: '## Volume +5```bash\nwpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+\n```\nThis command uses the `wpctl` utility to adjust the volume of the default sink.'
  },
  { role: 'user', content: 'main advantages of the nixos operating system' },
  {
    role: 'assistant',
    content: '## NixOS advantages\n- **Reproducible**: A config working on one device will also work on another\n- **Declarative**: One config language to rule them all. Effortlessly share them with others.\n- **Reliable**: Per-program software versioning. Mitigates the impact of software breakage'
  },
  { role: 'user', content: 'whats skeumorphism' },
  {
    role: 'assistant',
    content: "## Skeuomorphism\n- A design philosophy- From early days of interface designing- Tries to imitate real-life objects- It's in fact still used by Apple in their icons until today."
  },
]
