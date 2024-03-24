// COLUMN1
const column1 = [
  {
    icon: '',
    name: 'Workspaces: navigation',
    binds: [
      { keys: ['⌘', '+', '1'], action: 'Go to workspace: Work ' },
      { keys: ['⌘', '+', '2'], action: 'Go to workspace: Explore' },
      { keys: ['⌘', '+', '3'], action: 'Go to workspace: Listen' },
      { keys: ['⌘', '+', '4'], action: 'Go to workspace: Communicate' },
      { keys: ['⌘', '+', '5'], action: 'Go to workspace: Virtual' },
      { keys: ['⌘', '+', '6'], action: 'Go to workspace: Extra' },
    ],
    appeartick: 1
  },

  {
    icon: '',
    name: 'Windows: Action',
    binds: [
      { keys: ['⌘', '+', 'Q'], action: 'Quit window' },
      { keys: ['⌘', 'Shift', '+', '#'], action: 'Move window to workspace #' },
      { keys: ['⌘', '+', '<direction>'], action: 'Focus window' },
      { keys: ['⌘', 'Shift', '+', '<direction>'], action: 'Switch window' },
      { keys: ['⌘', 'Alt', '+', '<direction>'], action: 'Move window (float)' },
      { keys: ['⌘', 'Ctrl', '+', '<direction>'], action: 'Resize window (float)' },
    ],
    appeartick: 1
  },

  {
    icon: '',
    name: 'Windows: Type',
    binds: [
      { keys: ['⌘', '+', 'M'], action: 'Maximize' },
      { keys: ['⌘', 'Shift', '+', 'F'], action: 'Fullscreen' },
      { keys: ['⌘', 'Alt', '+', 'F'], action: 'FakeFullscreen' },
      { keys: ['⌘', '+', '<direction>'], action: 'Focus window' },
      { keys: ['⌘', '+', 'C'], action: 'Center Layout' },
      { keys: ['⌘', '+', 'T'], action: 'Toggle Floating' },
      { keys: ['⌘', '+', 'P'], action: 'Pin (Float Window)' },
    ],
    appeartick: 1
  },
]

// COLUMN2
const column2 = [
  {
    icon: '󰜬',
    name: 'Widgets (AGS)',
    binds: [
      { keys: ['⌘', '+', 'R'], action: 'Restart AGS' },
      { keys: ['⌘', '+', 'Tab'], action: 'Toggle Overview' },
      { keys: ['⌘', '+', 'F4'], action: 'Toggle Power Menu' },
      { keys: ['⌘', '+', '/'], action: 'Toggle Shortcuts Menu' },
      { keys: ['⌘', '+', 'K'], action: 'Toggle virtual keyboard' },
    ],
    appeartick: 2
  },
  {
    icon: '',
    name: 'Screen Utilities',
    binds: [
      { keys: ['PrtSc'], action: 'Screenshot  >>  clipboard' },
      { keys: ['⌘', 'Shift', '+', 'S'], action: 'Screen snip  >>  clipboard' },
      { keys: ['⌘', 'Crtl', '+', 'C'], action: 'Color picker' },
      { keys: ['⌘', 'Ctrl', '+', 'K'], action: 'Show Screen Keys' },
      { keys: ['⌘', 'Alt', '+', 'R'], action: 'Record region' },
      { keys: ['Ctrl', 'Alt', '+', 'R'], action: 'Record region with sound' },
      { keys: ['⌘', 'Shift', 'Alt', '+', 'R'], action: 'Record screen with sound' }
    ],
    appeartick: 2
  },
]

// COLUMN3
const column3 = [
  {
    icon: '󱓞',
    name: 'Apps',
    binds: [
      { keys: ['⌘', '+', 'Return'], action: 'Launch terminal: Foot' },
      { keys: ['⌘', 'Ctrl', '+', 'T'], action: 'Toggle scratchpad Terminal' },
      { keys: ['⌘', 'Ctrl', '+', 'B'], action: 'Launch browser: Firefox' },
      { keys: ['⌘', 'Ctrl', '+', 'E'], action: 'Launch file manager: Nautilus' },
      { keys: ['⌘', 'Ctrl', '+', 'V'], action: 'Launch volume control: Pavucontrol' },
    ],
    appeartick: 3
  },
  {
    icon: '',
    name: 'Launcher actions',
    binds: [
      { keys: ['>raw'], action: 'Toggle mouse acceleration' },
      { keys: ['>img'], action: 'Select wallpaper and generate colorscheme' },
      { keys: ['>light'], action: 'Switch to light theme' },
      { keys: ['>dark'], action: 'Switch to dark theme' },
      { keys: ['>badapple'], action: 'Apply black & white colorscheme' },
      { keys: ['>color'], action: 'Pick acccent color' },
      { keys: ['>todo'], action: 'Type something after that to add a To-do item' },
    ],
    appeartick: 3
  }
]

export default [column1, column2, column3]
