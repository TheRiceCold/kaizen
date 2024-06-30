import { opt } from 'lib/option'

export default {
  player: {
    length: opt(32),
    coverSize: opt(100),
  },
  pomodoro: {
    // set by minutes
    focus: opt(25),
    shortBreak: opt(5),
    longBreak: opt(15),
  },

  dock: {
    enabled: false,
    pinnedApps: ['firefox', 'spotify', 'vesktop', 'nautilus', 'bottles', 'blender', 'krita', 'neovide'],
    trigger: ['client-added', 'client-removed'], // client_added, client_move, workspace_active, client_active
    searchPinnedAppIcons: opt(false), // Try to search for the correct icon if the app class isn't an icon name
    icons: {
      // Find the window's icon by its class with levenshteinDistance
      // The file names are processed at startup, so if there
      // are too many files in the search path it'll affect performance
      // Example: ['/usr/share/icons/Tela-nord/scalable/apps']
      'searchPaths': [''],

      substitutions: {
        'code-url-handler': 'visual-studio-code',
        'Code': 'visual-studio-code',
        'GitHub Desktop': 'github-desktop',
        'Minecraft* 1.20.1': 'minecraft',
        'gnome-tweaks': 'org.gnome.tweaks',
        'pavucontrol-qt': 'pavucontrol',
        'wps': 'wps-office2019-kprometheus',
        'wpsoffice': 'wps-office2019-kprometheus',
        '': 'image-missing',
      }
    },
  }
}
