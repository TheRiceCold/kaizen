import { opt } from 'lib/option'

import { facts, quotes, verses, questions } from 'data/knowledge'

export default {
  tasksDirectory: opt(''),
  githubUser: opt('TheRiceCold'),
  photo: opt(`/home/${Utils.USER}/photo-sample.jpg`),
  bio: opt('~ What we do in life, echoes in eternity ~'),

  apps: opt([
    // Write a list of applications you want to show
    // this applications MUST be installed
    // Example:
    //[ // Column 1
    //  'firefox', 'spotify',
    //  { label: 'discord', icon: 'discord', name: 'vesktop' },
    //  { label: 'chrome', name: 'google-chrome-stable' },
    //  'obs',
    //],
    //
    //[ // Column 2
    //  'zed', 'neovide',
    //  { label: 'godot', name: 'godot4' },
    //  { label: 'Android Studio', name: 'android-studio' },
    //],
    //
    //[ // Column 3
    //  'krita', 'gimp', 'blender', 'inkscape',
    //  { label: 'Libre Sprite', name: 'libresprite' }
    //],
    //
    //[ // Column 4
    //  { label: 'shell', name: 'foot' },
    //  { label: 'Virtual Machine Manager', name: 'virt-manager' },
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
  }

}
