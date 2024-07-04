import { opt } from 'lib/option'

export default {
  github: { username: opt('TheRiceCold') },
  photo: opt(`/home/${Utils.USER}/photo-sample.jpg`),
  tasks: { directory: opt(`/home/${Utils.USER}/tasks`) },
  bio: opt('~ What we do in life, echoes in eternity ~'),
  player: {
    length: opt(32),
    coverSize: opt(200),
  },

  apps: opt([
    [
      'firefox', 'spotify',
      { label: 'discord', icon: 'discord', name: 'vesktop' },
      { label: 'chrome', name: 'google-chrome-stable' },
      'obs',
    ],

    [
      'neovide',
      'insomnia',
      { label: 'Android Studio', name: 'android-studio' },
      { label: 'godot', name: 'godot4' },
    ],

    [
      'krita', 'gimp', 'blender', 'inkscape',
      { label: 'Libre Sprite', name: 'libresprite' }
    ],

    [
      { label: 'shell', name: 'foot' },
      { label: 'files', name: 'nautilus' },
      { label: 'calc', name: 'gnome-calculator' },
      { label: 'Virtual Machine Manager', name: 'virt-manager' },
    ]
  ]),

}
