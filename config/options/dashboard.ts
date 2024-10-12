import { opt } from 'lib/option'

import { facts, quotes, verses, questions } from 'data/knowledge'

export default {
  tasksDirectory: opt(''),
  githubUser: opt('TheRiceCold'),
  bio: opt('~ What we do in life, echoes in eternity ~'),

  apps: opt([
    [ // Column 1
      'firefox',
      'spotify',
      'discord:vesktop',
      'obs',
    ],
    [ // Column 2
      'zed',
      'neovide',
      'Android Studio:android-studio'
    ],

    [ // Column 3
      'krita',
      'gimp',
      'blender',
      'inkscape',
      'libresprite'
    ],

    [ // Column 4
      'shell:foot',
      'Virtual Machine Manager:virt-manager',
    ]
  ]),

  knowledge: {
    quotes: {
      hidden: opt([]),
      data: opt(quotes),
    },
    verses: {
      hidden: opt([]),
      data: opt(verses),
    },
    facts: {
      hidden: opt([]),
      data: opt(facts),
    },
    questions: {
      hidden: opt([]),
      data: opt(questions),
    },
  },
}
