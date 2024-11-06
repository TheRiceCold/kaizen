import { opt } from 'lib/option'

import { facts, quotes, verses, questions } from 'data/knowledge'

export default {
  tasksDirectory: opt(''),
  githubUser: opt('TheRiceCold'),
  bio: opt('~ What we do in life, echoes in eternity ~'),

  apps: opt([
    // INFO: The format for adding an app: app_icon_name:app_name
    // Example
    //[ // Column 1
    //  'qutebrowser',
    //  'spotify',
    //  'discord:vesktop',
    //],
    //[ // Column 2
    //  'emacs',
    //  'neovide',
    //  'Android Studio:android-studio'
    //],
    //
    //[ // Column 3
    //  'krita',
    //  'blender',
    //  'inkscape',
    //],
    //
    //[ // Column 4
    //  'shell:foot',
    //  'Virtual Machine Manager:virt-manager',
    //]
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
